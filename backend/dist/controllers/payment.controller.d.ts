import { Request, Response } from 'express';
/**
 * Create Razorpay order for donation
 */
export declare const createOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Verify Razorpay payment signature
 */
export declare const verifyPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get payment details by payment ID
 */
export declare const getPaymentDetails: (req: Request, res: Response) => Promise<void>;
/**
 * Refund a payment
 */
export declare const refundPayment: (req: Request, res: Response) => Promise<void>;
/**
 * Get Razorpay configuration for frontend
 */
export declare const getRazorpayConfig: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=payment.controller.d.ts.map