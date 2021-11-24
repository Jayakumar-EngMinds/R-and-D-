module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    autoOpen: false,
    auth: {
      secret: env("ADMIN_JWT_SECRET", "f81ef6fd1133877c68f58feb8d7d64ef"),
    },
  },
});
