"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donation_controller_1 = require("../controllers/donation.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
// Public route - browse all donations
router.get('/', donation_controller_1.DonationController.getAllDonations);
router.get('/:id', donation_controller_1.DonationController.getDonationById);
// NGO routes
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ngo', 'admin'), [
    (0, express_validator_1.body)('donation_type').isIn(['food', 'funds', 'clothes', 'books', 'toys', 'medical', 'other']).withMessage('Invalid donation type'),
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('quantity_or_amount').notEmpty().withMessage('Quantity or amount is required'),
    (0, express_validator_1.body)('location').notEmpty().withMessage('Location is required'),
    (0, express_validator_1.body)('pickup_date_time').isISO8601().withMessage('Valid pickup date and time is required'),
    (0, express_validator_1.body)('priority').optional().isIn(['normal', 'urgent', 'critical']),
    validation_middleware_1.validateRequest
], donation_controller_1.DonationController.createDonation);
router.put('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ngo', 'admin'), donation_controller_1.DonationController.updateDonation);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ngo', 'admin'), donation_controller_1.DonationController.cancelDonation);
router.get('/ngo/my-donations', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ngo', 'admin'), donation_controller_1.DonationController.getDonationsByNgo);
exports.default = router;
//# sourceMappingURL=donation.routes.js.map