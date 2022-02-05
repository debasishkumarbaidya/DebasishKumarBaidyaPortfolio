const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const ejs = require("ejs");
require("dotenv").config();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const USER_ID = process.env.USER_ID;
const ADMIN_ID = process.env.ADMIN_ID;
const ADMIN_NAME= process.env.ADMIN_NAME;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

async function sendEmail(name, from, message) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "oAuth2",
        user: USER_ID,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const emailOptions = {
      from: `${name} <${from}>`,
      to: ADMIN_ID,
      subject: "Portfolio Site Contact Message",
      replyTo: from,
      text: message,
    };

    const html=`
    <html>
    <head>
    <style>
    #user__name {
        font-style: italic;
        color: rgb(240, 216, 171);
      }
      </style>
    </head>
    <body>
    <h3>
    Dear <span id="user__name">${name},</span> <br />
    Thank you for reaching out, I will get back to you as soon as
    possible.
  </h3>
  </body>
  </html>`
    const emailOptionsAdmin = {
      from: `${ADMIN_NAME} <${ADMIN_ID}>`,
      to: from,
      subject: "Thank you for reaching out",
      replyTo: ADMIN_ID,
      text: ` Dear ${name},\n
      Thank you for reaching out, I will get back to you as soon as
      possible.`,
      html:html
      
      
    };

    const result = await transport.sendMail(emailOptions);
    const result1 = await transport.sendMail(emailOptionsAdmin);
    return result,result1;
  } catch (err) {
    console.log(err);
  }
   
}

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  const { name, email, message } = req.body;

  sendEmail(name,email,message).then(result=>{
      console.log("Email has been Sent!",result);
  }).catch(err=>{
      console.log(err);
  });
res.render("message",{ user:name})
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
