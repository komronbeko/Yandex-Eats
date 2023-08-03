"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_1 = __importDefault(require("../../models/User"));
const jwt_1 = require("../../utils/jwt");
const custom_error_1 = require("../../types/custom-error");
const sequelize_1 = require("sequelize");
const user_validate_1 = require("../../validations/user.validate");
const Restourant_1 = __importDefault(require("../../models/Restourant"));
//--------LOGIN--------------------------------
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //VALIDATION
        const { error } = (0, user_validate_1.loginSchema)({ email, password });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        //Finding an email and Comparing Hash Values
        const findUser = (await User_1.default.findOne({ where: { email } })) ||
            (await Restourant_1.default.findOne({ where: { email } }));
        if (!findUser)
            throw new custom_error_1.CustomError("Incorrect email or password!", 403);
        const comparePassword = await bcrypt_1.default.compare(password, findUser.dataValues?.password);
        if (!comparePassword)
            throw new custom_error_1.CustomError("Incorrect email or password!", 403);
        //TOKEN
        const token = (0, jwt_1.sign)({ email: findUser.dataValues.email });
        res.status(200).json({
            message: "Successfully logged in!",
            token: token,
            role: findUser.dataValues.role,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
//--------REGISTER, SENDING VERIFICATION CODE--------------------------------
const transporter = nodemailer_1.default.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "uzakovumar338@gmail.com",
        pass: "ecfuorlboksqoiwd",
    },
    secure: true,
});
const register = async (req, res, next) => {
    try {
        const { name, email, password, phone_number, role } = req.body;
        //VALIDATION
        const { error } = (0, user_validate_1.registerSchema)({
            name,
            email,
            password,
            phone_number,
            role,
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        const code = Math.floor(100000 + Math.random() * 900000);
        const mailData = {
            from: "uzakovumar338@gmail.com",
            to: email,
            subject: "Yandex Eats",
            text: "Verification",
            html: `<b>Your verification code is: ${code}</b>`,
        };
        //Finding an email and Hashing password
        const findUser = await User_1.default.findOne({
            where: { [sequelize_1.Op.or]: [{ name }, { email }] },
        });
        if (findUser) {
            switch (findUser?.dataValues.is_verified) {
                case true:
                    throw new custom_error_1.CustomError("User already exists", 403);
                case false:
                    const data = await transporter.sendMail(mailData);
                    return res.status(201).json({
                        message: "Verification code is sent to your email!",
                        code,
                        email,
                        role,
                    });
            }
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        //NEWUSER
        await User_1.default.create({
            name,
            email,
            password: hashedPassword,
            phone_number,
            role,
        });
        const data = await transporter.sendMail(mailData);
        res.status(201).json({
            message: "Verification code is sent to your email!",
            code,
            email,
            role,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
//--------CHECKING, IF VERIFICATION CODE IS REAL--------------------------------
const verifyUser = async (req, res, next) => {
    try {
        const { verifyCode, code, email, role } = req.body;
        if (code != verifyCode) {
            throw new custom_error_1.CustomError("Incorrect code", 403);
        }
        await User_1.default.update({ is_verified: true }, {
            where: {
                email,
            },
        });
        // TOKEN
        const token = (0, jwt_1.sign)({ email });
        res.status(200).json({ message: "Successfully registered!", token, role });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyUser = verifyUser;
