"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pickup_controller_1 = require("../controllers/pickup.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authenticate, [
    (0, express_validator_1.body)('contribution_id').isInt().withMessage('Valid contribution ID is required'),
    (0, express_validator_1.body)('pickup_date').isISO8601().withMessage('Valid pickup date is required'),
    (0, express_validator_1.body)('pickup_address').notEmpty().withMessage('Pickup address is required'),
    validation_middleware_1.validateRequest
], pickup_controller_1.PickupController.schedulePickup);
router.get('/:id', auth_middleware_1.authenticate, pickup_controller_1.PickupController.getPickupById);
router.get('/contribution/:contribution_id', auth_middleware_1.authenticate, pickup_controller_1.PickupController.getPickupsByContribution);
router.get('/ngo/my-pickups', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ngo', 'admin'), pickup_controller_1.PickupController.getNgoPickups);
router.put('/:id/status', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ngo', 'admin'), [
    (0, express_validator_1.body)('status').isIn(['scheduled', 'in-progress', 'completed', 'cancelled']).withMessage('Invalid status'),
    validation_middleware_1.validateRequest
], pickup_controller_1.PickupController.updatePickupStatus);
exports.default = router;
//# sourceMappingURL=pickup.routes.js.map