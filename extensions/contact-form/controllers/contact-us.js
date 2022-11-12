"use strict";

module.exports = {
  send: async (ctx) => {
    const { name, email, phone, message, jobTitle, organization, country } =
      ctx.request.body;

    const origin = ctx.request.header.origin;

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

    const requiredFields = [
      "name",
      "email",
      "phone",
      "jobTitle",
      "organization",
      "country",
    ];

    requiredFields.forEach((field) => {
      const fieldsValue = contactForm[field];
      if (typeof fieldsValue === "undefined" || !fieldsValue) {
        throw strapi.errors.badRequest(`No ${field} is given`);
      }
    });

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
