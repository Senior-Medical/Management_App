import { Request, Response, NextFunction } from 'express';
import { NestMiddleware } from '@nestjs/common';
export declare class RequestTimingMiddleware implements NestMiddleware {
    use(req: Request & {
        startTime: number;
    }, res: Response, next: NextFunction): void;
}
