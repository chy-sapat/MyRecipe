import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sapatchy69@gmail.com",
    pass: "lenoVo@0123",
  },
});

var mailOption = {
  from: "youremail@gmail.com",
  to: "chy.sapat@gmail.com",
  subject: "Sending Email using Node.js",
  text: "Testing is fun",
};

transporter.sendMail(mailOption, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
