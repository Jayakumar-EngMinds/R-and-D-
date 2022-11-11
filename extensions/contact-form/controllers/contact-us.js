"use strict";

module.exports = {
  send: async (ctx) => {
    const { name, email, phone, message, jobTitle, organization, country } =
      ctx.request.body;

    const origin = ctx.request.header.origin;

    if (typeof name === "undefined" || !name) {
      throw strapi.errors.badRequest("No name is given");
    }

    if (typeof email === "undefined" || !email) {
      throw strapi.errors.badRequest("No email is given");
    }

    if (typeof phone === "undefined" || !phone) {
      throw strapi.errors.badRequest("No phone is given");
    }

    const contactForm = {
      email,
      name,
      jobTitle,
      phone,
      message,
      origin,
      organization,
      country,
    };

    /**
     * @type {import('../services/contact-us')}
     */
    const contactUsService =
      strapi.plugins["contact-form"].services["contact-us"];

    await contactUsService.sendAdminEmail(contactForm);

    ctx.send({
      ok: true,
    });
  },
};
