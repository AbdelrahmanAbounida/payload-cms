import express from "express";
import payload from "payload";

require("dotenv").config();
const app = express();

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!, // this is used by payload to generate jwt tokens
    express: app,
  });

  app.listen(Number(process.env.BACKEND_PORT!), async () => {
    console.log(
      `Express is now listening for incoming connections on port ${process.env.BACKEND_PORT}.`
    );
  });
};

start();
