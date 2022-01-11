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
        .query("article")
        .model.query((db) => {
          db.where("category", params.id).count();
        })
        .fetch();

      const articleCount = result.toJSON();

      if (parseInt(articleCount.count)) {
        showError("Cant be removed. Category has articles", 400);
      }
    },
  },
};
