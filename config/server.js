module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("NGINX_URL", "http://api.example.com"),
  admin: {
    autoOpen: false,
    auth: {
      secret: env("ADMIN_JWT_SECRET", "f81ef6fd1133877c68f58feb8d7d64ef"),
    },
  },
  cors: {
    enabled: true,
    origin: ["https://dz9i3m5hmh4kh.cloudfront.net/"],
  },
});
