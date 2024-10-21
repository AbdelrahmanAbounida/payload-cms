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

dotenv.config({
  path: path.resolve(__dirname, "./.env"),
});

export default buildConfig({
  routes: {
    api: "/api",
    graphQL: "/gql",
    graphQLPlayground: "/gql-playground",
    admin: "/admin",
  },
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- Exomerce",
      favicon: "/favicon.ico",
      // ogImage: ""
    },
  },
  rateLimit: {
    max: 300, // default 500
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URL!,
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [Users],
  globals: [],
  typescript: {
    outputFile: path.resolve(__dirname, "payload/payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(
      __dirname,
      "payload/generated-schema.graphql"
    ),
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
