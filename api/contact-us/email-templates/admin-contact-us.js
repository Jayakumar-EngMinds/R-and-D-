"use strict";

const subject = `Contact form submission: <%= contactForm.name %>`;

const text = `You have received a new message. Here are the details:

Name: <%= contactForm.name %>
Email: <%= contactForm.email %>
Phone: <%= contactForm.phone %>
Message: <%= contactForm.message %>
`;

const htmlTemplateName = "admin-contact-us.html";

module.exports = {
  subject,
  text,
  htmlTemplateName,
};
