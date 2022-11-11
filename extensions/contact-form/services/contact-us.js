"use strict";
const path = require("path");
const fs = require("fs").promises;

exports.sendEmail = async (to, template, contactForm) => {
  const options = [
    {
      to,
    },
    template,
    {
      contactForm,
    },
  ];

  try {
    return await strapi.plugins.email.services.email.sendTemplatedEmail(
      ...options
    );
  } catch (e) {
    console.log(e.message);

    if (e.statusCode === 400) {
      throw strapi.errors.badRequest(e.message);
    } else {
      throw new Error(`Couldn't send email: ${e.message}.`);
    }
  }
};

/**
 * Read email config and template and return configuration
 * @date 2021-06-22
 * @param {string} templateName
 * @returns {Promise<Object.<string, string>>}
 */
exports.getEmailConfig = async (templateName) => {
  const templates = {
    ["admin-contact-us"]: "admin-contact-us",
  };

  const templatesFolder = path.join(__dirname, "..", "email-templates");

  try {
    const templateConfig = require(path.join(
      templatesFolder,
      templates[templateName]
    ));

    const htmlPath = path.join(
      templatesFolder,
      "html",
      templateConfig.htmlTemplateName
    );

    const html = await fs.readFile(htmlPath);

    return {
      html,
      subject: templateConfig.subject,
      text: templateConfig.text,
    };
  } catch (error) {
    throw strapi.errors.badRequest(error.message);
  }
};

/**
 * Return admin template name
 * @date 2021-06-22
 * @param {boolean} isProductSelected
 * @returns {string}
 */
exports.getAdminTemplateName = () => {
  return "admin-contact-us";
};

/**
 * Send Email with prepared config
 * @date 2021-06-22
 * @param {string} to email
 * @param {Object.<string, string>} config
 * @param {Object.<string, string>} formData
 * @returns {Promise<void>}
 */
exports.sendEmailWithConfig = async (to, config, formData) => {
  await module.exports.sendEmail(to, config, formData);
};

/**
 * Send Email to admin
 * @date 2021-06-22
 * @param {Object.<string, string>} contactForm
 * @returns {Promise<void>}
 */
exports.sendAdminEmail = async (contactForm) => {
  const providedSettings =
    strapi.plugins.email.services.email.getProviderSettings();

  const to = providedSettings.settings.defaultAdmin;
  const templateName = module.exports.getAdminTemplateName();

  const config = await module.exports.getEmailConfig(templateName);

  module.exports.sendEmailWithConfig(to, config, contactForm);
};
