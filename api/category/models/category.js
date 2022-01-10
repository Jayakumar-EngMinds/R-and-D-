"use strict";
const Boom = require("boom");

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
        const err = new Error("Cant be removed. Category has articles");
        const boomError = Boom.boomify(err, {
          statusCode: 400,
        });
        throw boomError;
      }
    },
  },
};
