import {
  numberOfRowsFilled,
  po_number,
  supplier,
  decsription,
} from "./WorksheetFiller.js";
import XLSX from "xlsx";
import mongoose from "mongoose";
import { Supplier } from "./model/suppliers.model.js";
import "dotenv/config";

async function getSuppliersInfo(fname) {
  const suppliers = [];
  const filename = `modified/uploaded/${fname}`;
  var workbook = XLSX.readFile(filename);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const connStr = process.env.mongoDBCloudConnect;
  for (let i = 2; i <= numberOfRowsFilled; i++) {
    const supplierName = worksheet[`${supplier}${i}`].v;
    const poNumber = worksheet[`${po_number}${i}`].v;
    const descriptions = worksheet[`${decsription}${i}`].v;

    const existingSupplier = suppliers.find(
      (supplier) => supplier.supplier === supplierName
    );

    if (existingSupplier) {
      existingSupplier.purchaseOrders.push({
        PO_Number: poNumber,
        Description: descriptions,
      });
    } else {
      const newSupplier = {
        supplier: supplierName,
        purchaseOrders: [
          {
            PO_Number: poNumber,
            Description: descriptions,
          },
        ],
      };
      suppliers.push(newSupplier);
    }
  }
  if (suppliers.length > 0) {
    mongoose
      .connect(connStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) =>
        console.log("mongoDB connected successfully for data extractor")
      )
      .catch((err) =>
        console.log("Error while connecting to mongoDB in data extractor")
      );
    const collection = mongoose.connection.collection("suppliers");
    collection
      .drop()
      .then((res) => {
        console.log("drop success", res);
        Supplier.insertMany(suppliers)
          .then(() => {
            console.log("All suppliers saved.");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log("drop faiiled"));
  } else console.log("no data to save from extractor");
}

export { getSuppliersInfo };
