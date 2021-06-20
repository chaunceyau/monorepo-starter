import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import * as Joi from '@hapi/joi';
//
import common from './namespaces/common';
import cookies from './namespaces/cookies';
import stripe from './namespaces/stripe';
import jwt from './namespaces/jwt';
import aws from './namespaces/aws';
import imgix from './namespaces/imgix';
//
import {GlobalConfigService} from './services/global.config';
import {CookiesConfigService} from './services/cookies.config';
import {SentryConfigService} from './services/sentry.config';
import {StripeConfigService} from './services/stripe.config';
import {JwtConfigService} from './services/jwt.config';
import {ImgixConfigService} from './services/imgix.config';
import {AWSConfigService} from './services/aws.config';

const INDIVIDUAL_CONFIG_SERVICES = [
  CookiesConfigService,
  GlobalConfigService,
  SentryConfigService,
  StripeConfigService,
  ImgixConfigService,
  JwtConfigService,
  AWSConfigService,
];

const CONFIG_NAMESPACES = [common, cookies, stripe, jwt, aws, imgix];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: CONFIG_NAMESPACES,
      validationSchema: Joi.object({
        PORT: Joi.number().default(5000).required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        //
        DATABASE_URL: Joi.string().required(),
        FRONTEND_URL: Joi.string().required(),
        // COOKIES
        COOKIE_SIGNING_SECRET: Joi.string().required(),
        // STRIPE
        STRIPE_SECRET_KEY: Joi.string().required(),
        STRIPE_SUBSCRIPTION_PRODUCT_ID: Joi.string().required(),
        STRIPE_SUBSCRIPTION_MONTHLY_PRICE_ID: Joi.string().required(),
        STRIPE_SUBSCRIPTION_ANNUAL_PRICE_ID: Joi.string().required(),
        STRIPE_BILLING_PORTAL_REDIRECT_URL: Joi.string().required(),
        STRIPE_CHECKOUT_SUCCESS_REDIRECT_URL: Joi.string().required(),
        STRIPE_CHECKOUT_CANCEL_REDIRECT_URL: Joi.string().required(),
        //JWT
        JWT_SIGNING_KEY: Joi.string().required(),
        // AWS
        AWS_S3_BUCKET: Joi.string().required(),
        AWS_S3_REGION: Joi.string().required(),
        AWS_S3_ACCESS_KEY_ID: Joi.string().required(),
        AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
        // IMGIX
        IMGIX_DOMAIN: Joi.string().required(),
        IMGIX_SECURE_URL_TOKEN: Joi.string().required(),
      }),
    }),
  ],
  providers: INDIVIDUAL_CONFIG_SERVICES,
  exports: INDIVIDUAL_CONFIG_SERVICES,
})
export class LocalConfigModule {}
