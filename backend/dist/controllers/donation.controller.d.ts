import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare class DonationController {
    static createDonation(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getAllDonations(req: Request, res: Response): Promise<void>;
    static getDonationById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateDonation(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static cancelDonation(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getDonationsByNgo(req: AuthRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=donation.controller.d.ts.map