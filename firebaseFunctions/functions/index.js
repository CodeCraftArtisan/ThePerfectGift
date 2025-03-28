const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")("sk_test_51R0NE4P2Ht3bcQxjpEGiHqe6NnAARNtB0Y8ByGHopqZuQiYBiMXh6jhvjS06VFIS1phn521HrnyU8xlL3od98ENW00TLYG1zmx"); 

admin.initializeApp();

exports.stripeCheckout = functions.https.onCall(async (data, context) => {
    const cartItems = data.cartItems; // Array of items from frontend
    console.log("Cart Items: ", cartItems);

    const db = admin.firestore();
    let lineItems = [];

    for (const item of cartItems) {
        const docRef = db.collection("gift-products").doc(item.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            console.log(`Product ${item.id} not found`);
            continue;
        }

        const productData = doc.data();
        const price = productData.price || 0;
        const name = productData.name || "Unknown Product";
        const imageUrls = productData.imageUrls || [];

        lineItems.push({
            price_data: {
                currency: "eur",
                product_data: {
                    name: name,
                    images: imageUrls.length > 0 ? [imageUrls[0]] : [],
                },
                unit_amount: price * 100, // Convert to cents
            },
            quantity: item.quantity, // Use quantity from cart
        });
    }

    if (lineItems.length === 0) {
        return { error: "No valid items in cart" };
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:4200/success",
        cancel_url: "http://localhost:4200/cancel",
    });

    return { sessionId: session.id };
});

