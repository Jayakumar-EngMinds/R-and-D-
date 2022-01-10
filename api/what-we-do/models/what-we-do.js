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
        .query("our-projects")
        .model.query((db) => {
          db.where("service_category", params.id).count();
        })
        .fetch();

      const projectsCount = result.toJSON();

      if (parseInt(projectsCount.count)) {
        const err = new Error("Cant be removed. What we do has projects");
        const boomError = Boom.boomify(err, {
          statusCode: 400,
        });
        throw boomError;
      }
    },
  },
};
