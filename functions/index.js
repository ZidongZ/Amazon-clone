const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51IGy2OFGNisdqnbNmWb4AfaraHw2W7fVXAxm8syCRZD5iA6b81PkMsGnhTpub4FHp5UcaY5kkt9ll9S2M7n256OF00n71Z0RUc");

// API

// App config
const app = express();

// Middlewares
app.use(cors({origins: true}));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payment/create", async (request, response) => {
  const total = request.query.total;
  console.log("payment request received", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/website-1-21-9f313/us-central1/api
