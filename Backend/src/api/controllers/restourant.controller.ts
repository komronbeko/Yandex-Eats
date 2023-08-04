import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import { IRestourantBody } from "../../types/restourant.type";
import { restourantSchema } from "../../validations/restourant.validate";
import { CustomError } from "../../types/custom-error";
import Restourants from "../../models/Restourant";
import Foods from "../../models/Food";
import Rating from "../../models/Rating";
import { sequelize } from "../../../config/db/connections";
import { Op } from "sequelize";

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
      card_details,
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
      card_details,
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
      card_details,
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
          model: Rating,
          attributes: [
            [sequelize.fn("AVG", sequelize.col("stars")), "average_rating"],
          ],
        },
        {
          model: Foods,
        },
      ],
      group: ["Restourant.id", "Ratings.id", "Food.id"],
    });

    res.status(200).json({ message: "success", data });
  } catch (error) {
    next(error);
  }
};

export const get_one: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {id} = req.params;

    const findRestaurant = await Restourants.findOne({where: {id}});

    if(!findRestaurant) throw new CustomError("Restaurant, not found", 400);

    const data = await Restourants.findOne({
      include: [
        {
          model: Rating,
          attributes: [
            [sequelize.fn("AVG", sequelize.col("stars")), "average_rating"],
          ],
        },
        {
          model: Foods,
        },
      ],
      group: ["Restourant.id", "Ratings.id", "Food.id"],
      where: {id: findRestaurant.dataValues.id}
    },);

    res.status(200).json({ message: "success", data });
  } catch (error) {
    next(error);
  }
};

interface IGetNearQuery {
  longitude?: any;
  latitude?: any;
}

export const get_near: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { longitude, latitude } = req.query as IGetNearQuery;

    const distance = 3;

    const minLatitude = latitude - distance / 111;
    const maxLatitude = latitude + distance / 111;
    const minLongitude = longitude - distance / (111 * Math.cos(latitude));
    const maxLongitude = longitude + distance / (111 * Math.cos(latitude));

    const restaurants = await Restourants.findAll({
      where: {
        latitude: {
          [Op.between]: [minLatitude, maxLatitude],
        },
        longitude: {
          [Op.between]: [minLongitude, maxLongitude],
        },
      },
      limit: 10, // Limit the number of results to 10
    });

    res.status(200).json({message: "success", data: restaurants})
  } catch (error) {
    next(error)
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
      card_details,
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
      card_details,
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
          card_details,
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