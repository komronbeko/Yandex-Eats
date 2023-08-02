import { NextFunction, Request, RequestHandler, Response } from "express";
import Restourants from "../../models/Restourant";
import { CustomError } from "../../types/custom-error";
import { verify } from "../../utils/jwt";

interface IRestourantRequest extends Request {
  verifiedRestaurant: any;
}

const isRestaurantAdmin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];

    if (!token) throw new CustomError("Invalid token!", 401);

    const findRestourant = verify(token);

    const verifiedRestaurant = await Restourants.findOne({
      where: { email: findRestourant.email },
    });

    if (
      !verifiedRestaurant?.dataValues.is_verified ||
      verifiedRestaurant?.dataValues.role !== "restaurant_admin" ||
      verifiedRestaurant?.dataValues.role !== "admin" ||
      verifiedRestaurant?.dataValues.role !== "superadmin"
    )
      throw new CustomError("Invalid token!", 401);

    (req as IRestourantRequest).verifiedRestaurant =
      verifiedRestaurant.dataValues;
    next();
  } catch (error) {
    next(error);
  }
};

export default isRestaurantAdmin;
