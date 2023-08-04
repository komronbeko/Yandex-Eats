import Stripe from "stripe";
import Restourants from "../../models/Restourant";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { IRestourantBody } from "../../types/restourant.type";
import { CustomError } from "../../types/custom-error";
import { IUserRegister } from "../../types/user.type";
import Users from "../../models/User";
import Order from "../../models/Order";

const stripeService = new Stripe(
  "sk_test_51NXavzDU6UVW8TMJIUiWGby01OgMS2J0Pi4hZ66w9eajUY6tgR9FfMN814qlnxzqNifHObnVogFi39wyBci2fdSl00fPhEDzO2",
  { apiVersion: "2022-11-15" }
);

interface IConvertRequest extends Request {
  verifiedUser?: IUserRegister;
}

export const convert: RequestHandler = async (
  req: IConvertRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { amount, payment_id, order_id } = req.body;
    const verifiedUser = req.verifiedUser as IUserRegister;

    const findUser = await Users.findOne({ where: { id: verifiedUser.id } });
    const findOrder = await Order.findOne({ where: { id: order_id } });

    if(!findOrder) throw new CustomError("Order not found", 400);

    if (findUser?.dataValues.money < amount)
      throw new CustomError("Not enough money", 400);

     const payment = await stripeService.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Payment",
      payment_method: payment_id,
      confirm: true,
    });


    await Users.update(
      { money: findUser?.dataValues.money - amount },
      {
        where: {
          id: findUser?.dataValues.id,
        },
      }
    );

    await Order.update(
        { status: "paid" },
        {
          where: {
            id: findOrder?.dataValues.id,
          },
        }
      );



    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};