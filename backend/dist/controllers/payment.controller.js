"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRazorpayConfig = exports.refundPayment = exports.getPaymentDetails = exports.verifyPayment = exports.createOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const database_1 = require("../config/database");
// Initialize Razorpay instance
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});
/**
 * Create Razorpay order for donation
 */
const createOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR' } = req.body;
        const userId = req.user?.id;
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }
        // Validate Razorpay credentials
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({
                message: 'Razorpay credentials not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env file'
            });
        }
        // Create order options
        const options = {
            amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
            currency,
            receipt: `receipt_${Date.now()}`,
            notes: {
                userId: userId || 'guest',
                timestamp: new Date().toISOString()
            }
        };
        // Create Razorpay order
        const order = await razorpay.orders.create(options);
        res.json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt
            },
            key_id: process.env.RAZORPAY_KEY_ID
        });
    }
    catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({
            message: 'Failed to create payment order',
            error: error.message
        });
    }
};
exports.createOrder = createOrder;
/**
 * Verify Razorpay payment signature
 */
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationData } = req.body;
        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: 'Missing payment verification data' });
        }
        // Generate signature for verification
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto_1.default
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
            .update(sign)
            .digest('hex');
        // Verify signature
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }
        // Payment verified successfully - save to database
        if (donationData) {
            const { name, email, phone, cause, amount, anonymous, recurring } = donationData;
            const pool = (0, database_1.getPool)();
            const query = `
        INSERT INTO simple_donations 
        (name, email, phone, cause, amount, anonymous, recurring, payment_id, payment_status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'completed', NOW())
      `;
            await pool.execute(query, [
                name,
                email,
                phone || null,
                cause,
                amount,
                anonymous || false,
                recurring || false,
                razorpay_payment_id
            ]);
        }
        res.json({
            success: true,
            message: 'Payment verified successfully',
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id
        });
    }
    catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            message: 'Payment verification failed',
            error: error.message
        });
    }
};
exports.verifyPayment = verifyPayment;
/**
 * Get payment details by payment ID
 */
const getPaymentDetails = async (req, res) => {
    try {
        const { payment_id } = req.params;
        const payment = await razorpay.payments.fetch(payment_id);
        res.json({
            success: true,
            payment: {
                id: payment.id,
                amount: Number(payment.amount) / 100, // Convert from paise
                currency: payment.currency,
                status: payment.status,
                method: payment.method,
                email: payment.email,
                contact: payment.contact,
                created_at: payment.created_at
            }
        });
    }
    catch (error) {
        console.error('Error fetching payment details:', error);
        res.status(500).json({
            message: 'Failed to fetch payment details',
            error: error.message
        });
    }
};
exports.getPaymentDetails = getPaymentDetails;
/**
 * Refund a payment
 */
const refundPayment = async (req, res) => {
    try {
        const { payment_id } = req.params;
        const { amount, reason } = req.body;
        const refund = await razorpay.payments.refund(payment_id, {
            amount: amount ? Math.round(amount * 100) : undefined, // Partial or full refund
            notes: {
                reason: reason || 'Refund requested by admin'
            }
        });
        res.json({
            success: true,
            refund: {
                id: refund.id,
                payment_id: refund.payment_id,
                amount: (refund.amount || 0) / 100,
                status: refund.status
            }
        });
    }
    catch (error) {
        console.error('Error processing refund:', error);
        res.status(500).json({
            message: 'Refund failed',
            error: error.message
        });
    }
};
exports.refundPayment = refundPayment;
/**
 * Get Razorpay configuration for frontend
 */
const getRazorpayConfig = async (req, res) => {
    try {
        res.json({
            success: true,
            key_id: process.env.RAZORPAY_KEY_ID,
            configured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to get configuration',
            error: error.message
        });
    }
};
exports.getRazorpayConfig = getRazorpayConfig;
//# sourceMappingURL=payment.controller.js.map