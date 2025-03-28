const STRIPE_CONFIG = {
    SECRET_KEY: "",
    CURRENCY: "EUR",
    SUCCESS_URL: "http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}",
}

module.exports = {
    STRIPE_CONFIG,
};