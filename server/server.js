import express from "express";
import cors from "cors";
import { Supplier } from "./model/suppliers.model.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;
const connStr = process.env.mongoDBConnect;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(connStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Purchase Processor");
});

app.get("/supplier/:name", (req, res) => {
  console.log(req.params["name"]);
  Supplier.distinct("purchaseOrders.PO_Number", {
    supplier: req.params["name"],
  })
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
