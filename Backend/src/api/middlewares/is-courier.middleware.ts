import { NextFunction, Request, RequestHandler, Response } from "express";
import Restourants from "../../models/Restourant";
import { CustomError } from "../../types/custom-error";
import { verify } from "../../utils/jwt";
import User from "../../models/User";

interface IOrderRequest extends Request {
  verifiedCourier: any;
}

const isCourier: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];

    if (!token) throw new CustomError("Invalid token!", 401);

    const findCourier = verify(token);

    const verifiedCourier = await User.findOne({
      where: { email: findCourier.email, role: "courier" },
    });


    if (
      verifiedCourier?.dataValues.is_verified ||
      verifiedCourier?.dataValues.role == "courier" ||
      verifiedCourier?.dataValues.role == "admin" ||
      verifiedCourier?.dataValues.role == "superadmin"
    ) {
      (req as IOrderRequest).verifiedCourier =
        verifiedCourier.dataValues;
    } else {
      throw new CustomError("Invalid token!", 401);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default isCourier;
