import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../../types/custom-error";
import Restourants from "../../models/Restourant";
import { IUserRegister } from "../../types/user.type";
import { IRatingBody } from "../../types/rating.type";
import { ratingSchema } from "../../validations/rating.validate";
import Rating from "../../models/Rating";
import User from "../../models/User";

interface IRatingRequest extends Request {
  verifiedUser?: IUserRegister;
}

export const post: RequestHandler = async (
  req: IRatingRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { stars, restaurant_id } = req.body as IRatingBody;

    const {id: user_id} = req.verifiedUser as IUserRegister;


    const { error } = ratingSchema({
      restaurant_id, stars, user_id
    });
    if (error) throw new CustomError(error.message, 400);

    const findRestaurant = await Restourants.findOne({
      where: { id: restaurant_id },
    });

    if (!findRestaurant) throw new CustomError("Restaurant not found", 400);

    await Rating.create({ stars, restaurant_id, user_id });

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

export const get_all: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Rating.findAll({
      include: [
        {
          model: Restourants,
          attributes: ["name", "contact_number"]
        },
        {
            model: User,
            attributes: ["name", "email", "phone_number"]
        }
      ],
    });

    res.status(200).json({ message: "success", data });
  } catch (error) {
    next(error);
  }
};

