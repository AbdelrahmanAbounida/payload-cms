import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import dotenv from "dotenv";
import path from "path";
import { buildConfig } from "payload/config";
import Users from "./payload/collections/Users";
// import seo from '@payloadcms/plugin-seo'
// import type { GenerateTitle } from '@payloadcms/plugin-seo/types'

// const generateTitle: GenerateTitle = () => {
//   return 'Exomerce'
// }

const mockModulePath = path.resolve(__dirname, "./emptyModuleMock.js");

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            dotenv: path.resolve(__dirname, "./dotenv.js"),
            [path.resolve(
              __dirname,
              "collections/Products/hooks/beforeChange"
            )]: mockModulePath,
            [path.resolve(
              __dirname,
              "collections/Users/hooks/createStripeCustomer"
            )]: mockModulePath,
            [path.resolve(__dirname, "collections/Users/endpoints/customer")]:
              mockModulePath,
            [path.resolve(__dirname, "endpoints/create-payment-intent")]:
              mockModulePath,
            [path.resolve(__dirname, "endpoints/customers")]: mockModulePath,
            [path.resolve(__dirname, "endpoints/products")]: mockModulePath,
            [path.resolve(__dirname, "endpoints/seed")]: mockModulePath,
            stripe: mockModulePath,
            express: mockModulePath,
          },
        },
      };
    },
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URL!,
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [Users],
  globals: [],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  cors: [
    "https://checkout.stripe.com",
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
  ].filter(Boolean),
  csrf: [
    "https://checkout.stripe.com",
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
  ].filter(Boolean),
  endpoints: [],
  plugins: [
    // stripePlugin({
    //   stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    //   isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
    //   stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
    //   rest: false,
    //   webhooks: {
    //     'product.created': productUpdated,
    //     'product.updated': productUpdated,
    //     'price.updated': priceUpdated,
    //   },
    // }),
    // seo({
    //   collections: ['pages', 'products'],
    //   generateTitle,
    //   uploadsCollection: 'media',
    // }),
  ],
});
