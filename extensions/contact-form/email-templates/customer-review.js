"use strict";

const subject = `Contact form sent successfully`;

const text = `
Dear <%= contactForm.name %>,

We have received your message and we will contact you as soon as possible.

Thanks.`;

const htmlTemplateName = "customer-review.html";

module.exports = {
  subject,
  text,
  htmlTemplateName,
};
