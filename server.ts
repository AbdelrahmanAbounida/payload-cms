import express from "express";
import { getPayloadClient } from "./get-payload";
import next from "next";

require("dotenv").config();
const app = express();

const start = async () => {
  // 1- init payload
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });

  // 2- include nextjs api routes
  const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
    port: Number(process.env.FRONTEND_PORT) || 3000,
  });
  const nextHandler = nextApp.getRequestHandler();

  app.use((req, res) => nextHandler(req, res)); // forward all express routes to nextjs
  nextApp.prepare().then(() => {
    payload.logger.info("NextJS Started");

    app.listen(Number(process.env.BACKEND_PORT!), async () => {
      payload.logger.info(
        `Express is now listening for incoming connections on port ${process.env.BACKEND_PORT}.`
      );
    });
  });
};

start();
