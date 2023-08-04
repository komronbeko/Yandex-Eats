import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../../types/custom-error";
import Foods from "../../models/Food";
import { IOrderBody } from "../../types/order.type";
import { IUserRegister } from "../../types/user.type";
import { orderSchema } from "../../validations/order.validate";
import Order from "../../models/Order";
import { Op } from "sequelize";

interface IOrderRequest extends Request {
  verifiedUser?: IUserRegister;
}

export const post_order: RequestHandler = async (
  req: IOrderRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { food_id, process } = req.body as IOrderBody;

    const { id: user_id } = req.verifiedUser as IUserRegister;

    const { error } = orderSchema({
      user_id,
      food_id,
      process,
    });
    if (error) throw new CustomError(error.message, 400);

    const findFood = await Foods.findOne({
      where: { id: food_id },
    });

    if (!findFood) throw new CustomError("Food not found", 400);

    const findOrder = await Order.findOne({
      where: { user_id, food_id, process: "ongoing" },
    });

    if (findOrder) {
      await Order.update(
        {
          count: findOrder.dataValues.count + 1,
          total: findOrder.dataValues.price * (findOrder.dataValues.count + 1),
        },
        { where: { id: findOrder.dataValues.id } }
      );
    } else {
      await Order.create({
        food_id,
        process,
        user_id,
        food_name: findFood.dataValues.name,
        price: findFood.dataValues.price,
        total: findFood.dataValues.price,
      });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

export const orders_in_carts: RequestHandler = async (
  req: IOrderRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const verifiedUser = req.verifiedUser as IUserRegister;

    const data = await Order.findAll({
      where: {
        user_id: verifiedUser.id,
        process: "ongoing"
      },
      attributes: ["food_name", "price", "count", "total", "process"],
    });

    res.status(200).json({ message: "success", data });
  } catch (error) {
    next(error);
  }
};

export const delete_from_order: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const findOrder = await Order.findOne({ where: { id } });

    if (!findOrder) throw new CustomError("Order not found", 400);

    else if (findOrder.dataValues.count == 1) {
      await Order.destroy({ where: { id } });
    }

    else if (findOrder.dataValues.count > 1) {
      await Order.update(
        {
          count: findOrder.dataValues.count - 1,
          total: findOrder.dataValues.price * (findOrder.dataValues.count - 1),
        },
        {
          where: { id: findOrder.dataValues.id },
        }
      );
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};


export const paid_orders: RequestHandler = async (
  req: IOrderRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Order.findAll({
      where: {
        status: "paid"
      },
      attributes: ["food_name", "price", "count", "total", "process", "status"],
    });

    res.status(200).json({ message: "success", data });
  } catch (error) {
    next(error);
  }
};

export const ready_orders_get: RequestHandler = async (
  req: IOrderRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Order.findAll({
      where: {
        status: "ready"
      },
      attributes: ["food_name", "price", "count", "total", "process", "status"],
    });

    res.status(200).json({ message: "success", data });
  } catch (error) {
    next(error);
  }
};

export const order_ready: RequestHandler = async (
  req: IOrderRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { food_id, order_id } = req.body;


    const findFood = await Foods.findOne({
      where: { id: food_id },
    });
  
    if (!findFood) throw new CustomError("Food not found", 400);

    const findOrder = await Order.findOne({
      where: { id: order_id, food_id, process: "ongoing" },
    });

    if (!findOrder) throw new CustomError("Order not found", 400);


    await Order.update({status: "ready"}, {
      where: {id: order_id, food_id}
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};