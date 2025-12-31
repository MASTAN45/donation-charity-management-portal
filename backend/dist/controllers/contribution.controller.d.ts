import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare class ContributionController {
    static createContribution(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getContributionsByDonation(req: AuthRequest, res: Response): Promise<void>;
    static getDonorContributions(req: AuthRequest, res: Response): Promise<void>;
    static confirmContribution(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateContributionStatus(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getContributionById(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=contribution.controller.d.ts.map