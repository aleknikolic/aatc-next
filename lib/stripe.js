import settings from "../settings/settings-development.js";

const stripe =
  typeof Stripe !== "undefined" ? Stripe(settings.stripe.publishableKey) : null;

export default stripe;