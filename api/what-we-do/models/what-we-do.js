"use strict";
const { showError } = require("../../../utils/notification");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeDelete(params) {
      const result = await strapi
        .query("our-projects")
        .model.query((db) => {
          db.where("service_category", params.id).count();
        })
        .fetch();

      const projectsCount = result.toJSON();

      if (parseInt(projectsCount.count)) {
        showError("Cant be removed. Service has projects", 400);
      }
    },
  },
};
