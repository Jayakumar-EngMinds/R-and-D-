"use strict";
const Boom = require("boom");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

function checkCategory(data) {
  if (!data.category) {
    const err = new Error("Please select category");
    const boomError = Boom.boomify(err, {
      statusCode: 422,
    });
    throw boomError;
  }
}

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      checkCategory(data);
    },
    async beforeUpdate(params, data) {
      checkCategory(data);
    },
  },
};
