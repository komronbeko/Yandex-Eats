import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import { IRestourantBody } from "../../types/restourant.type";
import { restourantSchema } from "../../validations/restourant.validate";
import { CustomError } from "../../types/custom-error";
import Restourants from "../../models/Restourant";
import Foods from "../../models/Food";

export const post: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      owner,
      business_hours,
      email,
      password,
      contact_number,
      card_detailts,
      longitude,
      latitude,
      founded_at,
    } = req.body as IRestourantBody;

    const { error } = restourantSchema({
      name,
      owner,
      business_hours,
      email,
      password,
      contact_number,
      card_detailts,
      longitude,
      latitude,
      founded_at,
    });
    if (error) throw new CustomError(error.message, 400);

    const hashedPassword = await bcrypt.hash(password, 12);


    await Restourants.create({
      name,
      owner,
      business_hours,
      email,
      password: hashedPassword,
      contact_number,
      card_detailts,
      longitude,
      latitude,
      founded_at,
    });

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
    const data = await Restourants.findAll({
        include: [
            {
                model: Foods
            }
        ]
    });

    res.status(200).json({ message: "success", data });
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      owner,
      business_hours,
      email,
      password,
      contact_number,
      card_detailts,
      longitude,
      latitude,
      founded_at,
    } = req.body as IRestourantBody;

    const { id } = req.params;

    const { error } = restourantSchema({
      name,
      owner,
      business_hours,
      email,
      password,
      contact_number,
      card_detailts,
      longitude,
      latitude,
      founded_at,
    });
    if (error) throw new CustomError(error.message, 400);

    const findRestourant = await Restourants.findOne({ where: { id } });

    if (!findRestourant) throw new CustomError("Restourant not found", 400);
    else {
      await Restourants.update(
        {
          name,
          owner,
          business_hours,
          email,
          contact_number,
          card_detailts,
          longitude,
          latitude,
          founded_at,
        },
        { where: { id: findRestourant.dataValues.id } }
      );
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
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

    const findRestourant = await Restourants.findOne({ where: { id } });

    if (!findRestourant) throw new CustomError("Restourant not found", 400);
    else {
      await Restourants.destroy({
        where: { id: findRestourant.dataValues.id },
      });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
