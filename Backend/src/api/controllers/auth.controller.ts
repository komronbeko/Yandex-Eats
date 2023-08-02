import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import User from "../../models/User";
import { sign } from "../../utils/jwt";
import { CustomError } from "../../types/custom-error";
import { Op } from "sequelize";
import { IUserLogin, IUserRegister } from "../../types/user.type";
import { loginSchema, registerSchema } from "../../validations/user.validate";
import Restourant from "../../models/Restourant";

//--------LOGIN--------------------------------

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as IUserLogin;

    //VALIDATION
    const { error } = loginSchema({ email, password });
    if (error) throw new CustomError(error.message, 400);

    //Finding an email and Comparing Hash Values
    const findUser =
      (await User.findOne({ where: { email } })) ||
      (await Restourant.findOne({ where: { email } }));

    if (!findUser) throw new CustomError("Incorrect email or password!", 403);

    const comparePassword = await bcrypt.compare(
      password,
      findUser.dataValues?.password
    );

    if (!comparePassword)
      throw new CustomError("Incorrect email or password!", 403);

    //TOKEN
    const token = sign({ email: findUser.dataValues.email });
    res.status(200).json({
      message: "Successfully logged in!",
      token: token,
      role: findUser.dataValues.role,
    });
  } catch (error) {
    next(error);
  }
};

//--------REGISTER, SENDING VERIFICATION CODE--------------------------------

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "uzakovumar338@gmail.com",
    pass: "ecfuorlboksqoiwd",
  },
  secure: true,
});

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, phone_number, role } =
      req.body as IUserRegister;

    //VALIDATION
    const { error } = registerSchema({
      name,
      email,
      password,
      phone_number,
      role,
    });
    if (error) throw new CustomError(error.message, 400);

    const code: number = Math.floor(100000 + Math.random() * 900000);

    const mailData = {
      from: "uzakovumar338@gmail.com",
      to: email,
      subject: "Yandex Eats",
      text: "Verification",
      html: `<b>Your verification code is: ${code}</b>`,
    };

    //Finding an email and Hashing password
    const findUser = await User.findOne({
      where: { [Op.or]: [{ name }, { email }] },
    });
    if (findUser) {
      switch (findUser.is_verified) {
        case true:
          throw new CustomError("User already exists", 403);
        case false:
          const data = await transporter.sendMail(mailData);

          res.cookie("code", code, { maxAge: 120 * 100 * 60 });
          res.cookie("email", email, { maxAge: 120 * 100 * 60 });
          res.cookie("role", role, { maxAge: 120 * 100 * 60 });

          return res.status(201).json({
            message: "Verification code is sent to your email!",
          });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    //NEWUSER
    await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      role,
    });

    const data = await transporter.sendMail(mailData);

    res.cookie("code", code, { maxAge: 120 * 100 * 60 });
    res.cookie("email", email, { maxAge: 120 * 100 * 60 });
    res.cookie("role", role, { maxAge: 120 * 100 * 60 });

    res.status(201).json({
      message: "Verification code is sent to your email!",
    });
  } catch (error) {
    next(error);
  }
};

//--------CHECKING, IF VERIFICATION CODE IS REAL--------------------------------

export const verifyUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, email, role } = req.cookies;
    const verifyCode: number = req.body.verifyCode;

    if (code != verifyCode) {
      throw new CustomError("Incorrect code", 403);
    }

    await User.update(
      { is_verified: true },
      {
        where: {
          email,
        },
      }
    );

    // TOKEN
    const token = sign({ email });
    res.status(200).json({ message: "Successfully registered!", token, role });
  } catch (error) {
    next(error);
  }
};
