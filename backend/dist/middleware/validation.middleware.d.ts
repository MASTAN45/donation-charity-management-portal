import { Request, Response, NextFunction } from 'express';
export declare const validateRequest: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateDonation: (donation: any) => string | null;
export declare const validateRole: (role: string) => boolean;
//# sourceMappingURL=validation.middleware.d.ts.map