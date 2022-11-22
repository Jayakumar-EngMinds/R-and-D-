"use strict";
const { showError } = require("../../../utils/notification");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      if (!data.service_pages) {
        showError("Please select category page(s)", 422);
      }
    },
    async beforeUpdate(_, data) {
      if (!("published_at" in data) && !data.service_pages) {
        showError("Please select category page(s)", 422);
      }
    },
  },
};
