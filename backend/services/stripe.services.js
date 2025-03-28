const { STRIPE_CONFIG } = require("../config/app.config");

const stripe = require("stripe")(STRIPE_CONFIG.SECRET_KEY);

async function createCheckoutSession(items) {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{price: items.price, quantity: items.quantity}],
            mode: "payment",
            success_url: STRIPE_CONFIG.SUCCESS_URL,
            cancel_url: STRIPE_CONFIG.CANCEL_URL,
        });
        return ({id: session.id});
    } catch (error) {
        console.error("Error creating checkout session:", error);
        throw error;
    }
}

module.exports = {
    createCheckoutSession,
};