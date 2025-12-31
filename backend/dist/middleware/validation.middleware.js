"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = exports.validateDonation = exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};
exports.validateRequest = validateRequest;
const validateDonation = (donation) => {
    if (!donation.donation_type || !donation.quantity_or_amount || !donation.location || !donation.pickup_date_time) {
        return 'Donation type, quantity/amount, location, and pickup details must not be empty';
    }
    const pickupDate = new Date(donation.pickup_date_time);
    if (pickupDate < new Date()) {
        return 'Pickup date must be valid (not in the past)';
    }
    const quantity = parseFloat(donation.quantity_or_amount);
    if (isNaN(quantity) || quantity <= 0) {
        return 'Quantity/amount must be greater than 0';
    }
    return null;
};
exports.validateDonation = validateDonation;
const validateRole = (role) => {
    return ['donor', 'ngo', 'admin'].includes(role);
};
exports.validateRole = validateRole;
//# sourceMappingURL=validation.middleware.js.map