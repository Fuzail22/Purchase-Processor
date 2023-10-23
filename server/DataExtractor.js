import { numberOfRowsFilled } from "./WorksheetFiller.js";
import XLSX from "xlsx";
import mongoose from "mongoose";
import { Supplier } from "./model/suppliers.model.js";
const filename = "Modified\\Uploaded\\export29913.xlsx";
var workbook = XLSX.readFile(filename);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// D-Po Number L-Supplier P-Description
// let constructionPO = {};
// for (let i = 2; i <= numberOfRowsFilled; i++) {
//   let Supplier = worksheet[`L${i}`].v;
//   if (!constructionPO[Supplier]) constructionPO[Supplier] = [];
//   constructionPO[Supplier].push({
//     PO_Number: worksheet[`D${i}`].v,
//     Description: worksheet[`P${i}`].v,
//   });
// }
// // console.log(Object.keys(constructionPO).length);
// console.log(constructionPO);

const suppliers = [];

for (let i = 2; i <= numberOfRowsFilled; i++) {
  const supplierName = worksheet[`L${i}`].v;
  const poNumber = worksheet[`D${i}`].v;
  const description = worksheet[`P${i}`].v;

  const existingSupplier = suppliers.find(
    (supplier) => supplier.supplier === supplierName
  );

  if (existingSupplier) {
    existingSupplier.purchaseOrders.push({
      PO_Number: poNumber,
      Description: description,
    });
  } else {
    const newSupplier = {
      supplier: supplierName,
      purchaseOrders: [
        {
          PO_Number: poNumber,
          Description: description,
        },
      ],
    };
    suppliers.push(newSupplier);
  }
}

// const jsonsuppliers = JSON.stringify(suppliers, null, 2);
// console.log(jsonsuppliers);
// console.log(Object.keys(suppliers).length);
mongoose.connect("mongodb://localhost:27017/PurchaseProcessor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
Supplier.insertMany(suppliers)
  .then(() => {
    console.log("All suppliers saved.");
  })
  .catch((err) => {
    console.log(err);
  });
