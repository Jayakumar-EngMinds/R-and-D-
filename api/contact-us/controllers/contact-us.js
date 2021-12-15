"use strict";

module.exports = {
  send: async (ctx) => {
    const { name, email, phone, message } = ctx.request.body;

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
      phone,
      message,
      origin,
    };

    /**
     * @type {import('../services/contact-us')}
     */
    const contactUsService = strapi.services["contact-us"];

    await contactUsService.sendAdminEmail(contactForm);

    await contactUsService.sendCustomerEmail(contactForm);

    ctx.send({
      ok: true,
    });
  },
};
