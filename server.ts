import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { getPayloadClient } from "./get-payload";
import next from "next";
import { appRouter } from "./trpc";

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

  // trpc
  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // 2- include nextjs api routes
  const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
    port: Number(process.env.PORT) || 3000,
  });
  const nextHandler = nextApp.getRequestHandler();

  app.use((req, res) => nextHandler(req, res)); // forward all express routes to nextjs
  nextApp.prepare().then(() => {
    console.log("NextJS Started");

    app.listen(Number(process.env.PORT!), async () => {
      console.log(
        `Express is now listening for incoming connections on port ${process.env.PORT}.`
      );
    });
  });
};

start();

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = Awaited<ReturnType<typeof createContext>>;
