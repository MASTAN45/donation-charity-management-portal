"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
// Public routes
router.post('/register', [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('role').isIn(['donor', 'ngo', 'admin']).withMessage('Invalid role'),
    validation_middleware_1.validateRequest
], user_controller_1.UserController.register);
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
    validation_middleware_1.validateRequest
], user_controller_1.UserController.login);
// Protected routes
router.get('/profile', auth_middleware_1.authenticate, user_controller_1.UserController.getProfile);
router.put('/profile', auth_middleware_1.authenticate, [
    (0, express_validator_1.body)('name').optional().notEmpty(),
    (0, express_validator_1.body)('contact_info').optional(),
    (0, express_validator_1.body)('address').optional(),
    validation_middleware_1.validateRequest
], user_controller_1.UserController.updateProfile);
router.get('/all', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('admin'), user_controller_1.UserController.getAllUsers);
router.get('/role/:role', auth_middleware_1.authenticate, user_controller_1.UserController.getUsersByRole);
exports.default = router;
//# sourceMappingURL=user.routes.js.map