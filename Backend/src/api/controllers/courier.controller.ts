import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../../types/custom-error";
import Restourants from "../../models/Restourant";
import { ICourierBody } from "../../types/courier.type";
import { courierSchema } from "../../validations/courier.validate";
import Couriers from "../../models/Courier";

export const post: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, phone_number, restaurant_id } =
      req.body as ICourierBody;

    const { error } = courierSchema({
      name,
      email,
      password,
      phone_number,
      restaurant_id,
    });
    if (error) throw new CustomError(error.message, 400);

    const findRestaurant = await Restourants.findOne({
      where: { id: restaurant_id },
    });

    if (!findRestaurant) throw new CustomError("Restaurant not found", 400);

    await Couriers.create({
      name,
      email,
      password,
      phone_number,
      restaurant_id,
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const get_all: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Couriers.findAll({
      include: [
        {
          model: Restourants,
        },
      ],
    });

    res.status(200).json({ message: "success", data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const update: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, phone_number } =
      req.body as ICourierBody;
     
    const {id} = req.params;  

    const { error } = courierSchema({
      name,
      email,
      password,
      phone_number
    });
    if (error) throw new CustomError(error.message, 400);

    const findCourier = await Couriers.findOne({
      where: { id },
    });
    if (!findCourier) throw new CustomError("Courier not found", 400);
    else {
      await Couriers.update(
        {
          name,
          email,
          password,
          phone_number
        },
        { where: { id: findCourier.dataValues.id } }
      );
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const _delete: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const findCourier = await Couriers.findOne({ where: { id } });

    if (!findCourier) throw new CustomError("Courier not found", 400);
    else {
      await Couriers.destroy({
        where: { id: findCourier.dataValues.id },
      });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
