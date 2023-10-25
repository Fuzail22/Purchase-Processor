import express from "express";
import multer from "multer";
import cors from "cors";
import { Supplier } from "./model/suppliers.model.js";
import { Docket } from "./model/dockets.model.js";
import mongoose from "mongoose";
import "dotenv/config";
import {
  fillWorksheet,
  po_number,
  supplier,
  decsription,
} from "./WorksheetFiller.js";
import { getSuppliersInfo } from "./DataExtractor.js";

const app = express();
const PORT = process.env.PORT;
const connStr = process.env.mongoDBCloudConnect;
let Gfilename;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/Uploaded`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

mongoose
  .connect(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongoDB connected successfully"))
  .catch((err) => console.log("Error while connecting to mongoDB"));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Purchase Processor");
});

app.post("/upload", upload.single("file"), (req, res) => {
  Gfilename = req.file.originalname;
  console.log("Gfilename: ", Gfilename);
  fillWorksheet(Gfilename);
  console.log(po_number, supplier, decsription);
  if (po_number == null || supplier == null || decsription == null) {
    res.status(400).send("Please upload a proper file");
    return;
  }
  getSuppliersInfo(Gfilename);
  res.status(201).send("File Uploaded!");
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
      console.log("Details fetched successfully for the given Supplier");
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

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
