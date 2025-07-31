const { sendOrderConfirmation, sendShippingNotification, sendWelcomeEmail } = require('./sendEmail');

// Export all functions
exports.sendOrderConfirmation = sendOrderConfirmation;
exports.sendShippingNotification = sendShippingNotification;
exports.sendWelcomeEmail = sendWelcomeEmail;