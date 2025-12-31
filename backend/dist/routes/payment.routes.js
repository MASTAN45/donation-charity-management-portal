"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public routes
router.get('/config', payment_controller_1.getRazorpayConfig);
// Protected routes (require authentication)
router.post('/create-order', auth_middleware_1.authenticate, payment_controller_1.createOrder);
router.post('/verify', auth_middleware_1.authenticate, payment_controller_1.verifyPayment);
router.get('/payment/:payment_id', auth_middleware_1.authenticate, payment_controller_1.getPaymentDetails);
router.post('/refund/:payment_id', auth_middleware_1.authenticate, payment_controller_1.refundPayment);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map