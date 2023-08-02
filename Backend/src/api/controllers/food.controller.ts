import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../../types/custom-error";
import { IFoodBody } from "../../types/food.type";
import { foodSchema } from "../../validations/food.validate";
import Foods from "../../models/Food";
import Restourants from "../../models/Restourant";

export const post: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, price, weight, restourant_id } = req.body as IFoodBody;

    const { error } = foodSchema({
      name,
      price,
      weight,
      restourant_id,
    });
    if (error) throw new CustomError(error.message, 400);

    const findRestourant = await Restourants.findOne({
      where: { id: restourant_id },
    });

    if (!findRestourant) throw new CustomError("Restourant not found", 400);

    await Foods.create({ name, price, weight, restourant_id });

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
    const data = await Foods.findAll({
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
    const { name, price, weight, restourant_id } = req.body as IFoodBody;

    const { id } = req.params;

    const { error } = foodSchema({
      name,
      price,
      weight,
      restourant_id,
    });
    if (error) throw new CustomError(error.message, 400);

    const findFood = await Foods.findOne({ where: { id } });

    if (!findFood) throw new CustomError("Food not found", 400);
    else {
      await Foods.update(
        {
          name,
          price,
          weight,
        },
        { where: { id: findFood.dataValues.id } }
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

    const findFood = await Foods.findOne({ where: { id } });

    if (!findFood) throw new CustomError("Food not found", 400);
    else {
      await Foods.destroy({
        where: { id: findFood.dataValues.id },
      });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
