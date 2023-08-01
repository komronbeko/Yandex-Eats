import { NextFunction, Request, RequestHandler, Response } from "express";
import { IRestourantBody } from "../../types/restourant.type";
import { restourantSchema } from "../../validations/restourant.validate";
import { CustomError } from "../../types/custom-error";
import Restourants from "../../models/Restourant";

export const restourant_register: RequestHandler = async (
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
      contact_number,
      card_detailts,
      longitude,
      latitude,
      founded_at,
    });
    if (error) throw new CustomError(error.message, 400);

    await Restourants.create({
      name,
      owner,
      business_hours,
      email,
      contact_number,
      card_detailts,
      longitude,
      latitude,
      founded_at,
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
    const data = await Restourants.findAll();

    res.status(200).json({ message: "success", data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
