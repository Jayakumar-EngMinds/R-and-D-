"use strict";
const Boom = require("boom");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

function checkServiceCategory(data) {
  if (!data.service_category) {
    const err = new Error("Please select service category");
    const boomError = Boom.boomify(err, {
      statusCode: 422,
    });
    throw boomError;
  }
}

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      checkServiceCategory(data);
    },
    async beforeUpdate(params, data) {
      checkServiceCategory(data);
    },
  },
};
