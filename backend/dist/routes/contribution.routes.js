"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contribution_controller_1 = require("../controllers/contribution.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
// Donor routes
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('donor', 'admin'), [
    (0, express_validator_1.body)('donation_id').isInt().withMessage('Valid donation ID is required'),
    (0, express_validator_1.body)('quantity_or_amount').notEmpty().withMessage('Quantity or amount is required'),
    validation_middleware_1.validateRequest
], contribution_controller_1.ContributionController.createContribution);
router.get('/my-contributions', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('donor', 'admin'), contribution_controller_1.ContributionController.getDonorContributions);
router.get('/:id', auth_middleware_1.authenticate, contribution_controller_1.ContributionController.getContributionById);
// Get contributions for a specific donation
router.get('/donation/:donation_id', auth_middleware_1.authenticate, contribution_controller_1.ContributionController.getContributionsByDonation);
// NGO routes - confirm contribution
router.put('/:id/confirm', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ngo', 'admin'), contribution_controller_1.ContributionController.confirmContribution);
router.put('/:id/status', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ngo', 'admin'), [
    (0, express_validator_1.body)('status').isIn(['pending', 'confirmed', 'completed', 'cancelled']).withMessage('Invalid status'),
    validation_middleware_1.validateRequest
], contribution_controller_1.ContributionController.updateContributionStatus);
exports.default = router;
//# sourceMappingURL=contribution.routes.js.map