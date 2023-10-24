import express from "express";
import cors from "cors";
import { Supplier } from "./model/suppliers.model.js";
import { Docket } from "./model/dockets.model.js";
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

app.get("/allsuppliers", (req, res) => {
  Supplier.find({}, { supplier: 1, _id: 0 })
    .then((data) => {
      // console.log(data);
      console.log("suppliers fetched successfully");
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.get("/supplier", (req, res) => {
  console.log("Details required for ", req.query["supp"]);
  Supplier.findOne({ supplier: req.query["supp"] })
    .then((data) => {
      // console.log(data);
      console.log("Details fetched successfully for the given Supplier");
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// app.get("/supplier/:name", (req, res) => {
//   console.log(req.params["name"]);
//   Supplier.distinct("purchaseOrders.PO_Number", {
//     supplier: req.params["name"],
//   })
//     .then((data) => {
//       console.log(data);
//       res.status(201).send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send(err);
//     });
// });

// app.get("/po", (req, res) => {
//   console.log("Details required for ", req.query.no);
//   Supplier.aggregate([
//     { $match: { "purchaseOrders.PO_Number": req.query.no } },
//     {
//       $project: {
//         _id: 0,
//         descriptions: {
//           $filter: {
//             input: "$purchaseOrders",
//             as: "po",
//             cond: { $eq: ["$$po.PO_Number", req.query.no] },
//           },
//         },
//       },
//     },
//   ])
//     .then((data) => {
//       console.log(data);
//       res.status(201).send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send(err);
//     });
// });

app.post("/docket", (req, res) => {
  console.log(req.body);
  const docket = req.body;
  Docket.create(docket)
    .then((data) => {
      console.log("Docket created successfully: " + data);
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.get("/docket", (req, res) => {
  Docket.find({})
    .then((data) => {
      console.log("Dockets retrieved successfully");
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
