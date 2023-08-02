import { NextFunction, Request, Response } from "express";
import Users from "../../models/User";
import RestaurantCouriers from "../../models/Restaurant-couriers";
import Restourants from "../../models/Restourant";
import { IRestourantBody } from "../../types/restourant.type";
import { CustomError } from "../../types/custom-error";

interface IRestaurantCourierRequest extends Request {
  verifiedRestaurant?: IRestourantBody;
}

export const postRestaurantCouriers = async (
  req: IRestaurantCourierRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courier_id } = req.body;

    const restaurant = req.verifiedRestaurant as IRestourantBody;

    const findCourier = await Users.findOne({
      where: { id: courier_id },
    });

    if (!findCourier) throw new CustomError("Courier not found", 400);


    await RestaurantCouriers.create({
      UserId: courier_id,
      RestourantId: restaurant.id,
    });

    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantCouriers = async (req: Request, res: Response) => {
  try {
    const data = await RestaurantCouriers.findAll({
      include: [
        {
          model: Restourants,
          attributes: ["name", "owner"],
        },
        {
          model: Users,
          attributes: ["name", "email"],
        },
      ],
    });

    res.status(200).json({ message: "OK", data });
  } catch (error) {
    console.log(error);
  }
};
