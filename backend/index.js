const stripe = require('stripe')('sk_test_51R0NE4P2Ht3bcQxjpEGiHqe6NnAARNtB0Y8ByGHopqZuQiYBiMXh6jhvjS06VFIS1phn521HrnyU8xlL3od98ENW00TLYG1zmx');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const YOUR_DOMAIN = 'http://localhost:4200';

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { cartItems } = req.body;

        const lineItems = cartItems.map(item => ({
            price: item.stripeID, // Ensure this is the correct Stripe Price ID
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/cancel`,
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4242, () => console.log('Server running on port 4242'));
