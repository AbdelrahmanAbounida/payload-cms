import dotenv from "dotenv";
import path from "path";
import type { Payload } from "payload";
import payload from "payload";
import type { InitOptions } from "payload/config";

dotenv.config({
  path: path.resolve(__dirname, "./.env"),
});

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null };
}

interface Args {
  initOptions?: Partial<InitOptions>;
  seed?: boolean;
}

export const getPayloadClient = async ({
  initOptions,
  seed,
}: Args = {}): Promise<Payload> => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is missing");
  }
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET environment variable is missing");
  }
  if (cached.client) {
    return cached.client;
  }
  if (!cached.promise) {
    cached.promise = payload.init({
      //   mongoURL: process.env.DATABASE_URL!,
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }
  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }
  return cached.client;
};
