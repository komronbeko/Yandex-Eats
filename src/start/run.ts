import { Application } from "express";
import config from "../../config/config";
import { sequelize } from "../../config/db/connections";
import User from "../models/User";

const run = async (app: Application) => {
  await sequelize.authenticate({
    logging: false,
  });

  await sequelize.sync({
    alter: true,
    logging: false,
  });

  const admin = await User.findOne({
    where: { name: "superadmin", email: "ab@gmail.com" },
  });

  if (!admin) {
    await User.create({
      name: "superadmin",
      password: "$2b$12$oaOaQb4hy2PRocVtMIYdwuY6CCppnkwb3PHTEGlSbFdPDV2wX3k6m", //8869
      email: "ab@gmail.com",
      role: "superadmin",
      phone_number: "+998999938869",
      is_verified: true,
    });
  }

  app.all("/*", async (req, res) => {
    res.status(404).json({error: 'Route Not Found'});
  });

  app.listen(config.PORT, () => {
    console.log(`Server listening on ${config.PORT}`);
  });
};

export default run;
