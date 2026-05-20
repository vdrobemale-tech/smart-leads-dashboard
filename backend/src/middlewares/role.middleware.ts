import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const authorizeRoles =
  (...roles: ('admin' | 'sales')[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Role '${req.user.role}' is not allowed to access this route`
      );
    }

    next();
  };