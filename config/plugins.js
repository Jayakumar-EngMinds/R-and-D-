module.exports = ({ env }) => ({
  upload: {
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: env("AWS_ACCESS_KEY_ID"),
      secretAccessKey: env("AWS_ACCESS_SECRET"),
      region: env("AWS_REGION"),
      params: {
        Bucket: env("AWS_BUCKET_NAME"),
      },
    },
  },
  email: {
    provider: env("NODE_ENV") === "production" ? "amazon-ses" : "mailtrap",
    providerOptions: {
      key: env("SES_AWS_ACCESS_KEY_ID"),
      secret: env("SES_AWS_SECRET_ACCESS_KEY"),
      amazon: `https://email.${env("AWS_REGION")}.amazonaws.com`,
      user: env("MAILTRAP_USER"),
      password: env("MAILTRAP_PASSWORD"),
    },
    settings: {
      defaultFrom: env("EMAIL_DEFAULT_FROM"),
      defaultAdmin: env("EMAIL_DEFAULT_ADMIN"),
      defaultReplyTo: [
        env("EMAIL_DEFAULT_REPLY_TO_FIRST"),
        env("EMAIL_DEFAULT_REPLY_TO_SECOND"),
      ].filter(Boolean),
    },
  },
});
