import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../../models/User";
import { CustomError } from "../../types/custom-error";
import { verify } from "../../utils/jwt";

interface IUserRequest extends Request {
  verifiedUser: any;
}

const checkRole =
  (role: string): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.headers["authorization"] &&
        req.headers["authorization"].split(" ")[1];

      if (!token) throw new CustomError("Invalid token!", 401);

      const findUser = verify(token);

      const verifiedUser = await User.findOne({
        where: { email: findUser.email },
      });

      if (!verifiedUser || !verifiedUser.dataValues.is_verified)
        throw new CustomError("Invalid token!", 401);
      (req as IUserRequest).verifiedUser = verifiedUser.dataValues;

      if (verifiedUser?.dataValues.role !== role)
        throw new CustomError(
          `This route is only accessible by ${role}s!`,
          403
        );
      next();
    } catch (error) {
      next(error);
    }
  };

export const isSuperAdmin = checkRole("superadmin");
export const isAdmin = checkRole("admin");
export const isCourier = checkRole("courier");
export const isAuth = checkRole("user");
