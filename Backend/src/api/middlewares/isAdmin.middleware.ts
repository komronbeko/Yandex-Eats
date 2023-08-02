import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../../models/User";
import { CustomError } from "../../types/custom-error";
import { verify } from "../../utils/jwt";

const isAdmin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];

    if (!token) throw new CustomError("Invalid token!", 401);

    const findUser = verify(token);

    const verifiedUser = await User.findOne({
      where: { email: findUser.email },
    });


    if (
      verifiedUser?.dataValues.role == "admin" ||
      verifiedUser?.dataValues.role == "superadmin"
    ) {
      next();
    } else {
      throw new CustomError(
        `This route is only accessible by administrators!`,
        403
      );
    }
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
