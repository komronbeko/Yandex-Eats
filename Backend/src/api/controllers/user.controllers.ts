import { NextFunction, Request, RequestHandler, Response } from "express";
import Users from "../../models/User";
import { IUserRegister } from "../../types/user.type";
import { registerSchema } from "../../validations/user.validate";
import { CustomError } from "../../types/custom-error";

export const get_all_users: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Users.findAll();

    res.status(200).json({ message: "success", data });
  } catch (error) {
    next(error);
  }
};

export const get_all_couriers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Users.findAll({where: {role: "courier"}});

    res.status(200).json({ message: "success", data });
  } catch (error) {
    next(error);
  }
};

interface IUserRequest extends Request{
  verifiedUser?: IUserRegister
}

export const get_one_user: RequestHandler = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {id} = req.verifiedUser as IUserRegister;

    const user = await Users.findOne({where: {id}});

    res.status(200).json({ message: "success", data: user });
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, phone_number } =
      req.body as IUserRegister;

      const { id } = req.verifiedUser as IUserRegister;

    const { error } = registerSchema({
      name,
      email,
      password,
      phone_number
    });
    if (error) throw new CustomError(error.message, 400);

    const findUser = await Users.findOne({
      where: { id },
    });
    if (!findUser) throw new CustomError("User not found", 400);
    else {
      await Users.update(
        {
          name,
          email,
          password,
          phone_number
        },
        { where: { id: findUser.dataValues.id } }
      );
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

export const _delete: RequestHandler = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {id } = req.verifiedUser as IUserRegister;

    const findUser = await Users.findOne({ where: { id } });

    if (!findUser) throw new CustomError("User not found", 400);
    else {
      await Users.destroy({
        where: { id: findUser.dataValues.id },
      });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
