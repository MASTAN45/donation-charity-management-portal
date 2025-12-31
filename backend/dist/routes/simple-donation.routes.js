"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const simple_donation_controller_1 = require("../controllers/simple-donation.controller");
const router = (0, express_1.Router)();
// Public route for donation form submissions
router.post('/', simple_donation_controller_1.SimpleDonationController.createSimpleDonation);
// Get all donations (could add authentication later)
router.get('/', simple_donation_controller_1.SimpleDonationController.getAllSimpleDonations);
exports.default = router;
//# sourceMappingURL=simple-donation.routes.js.map