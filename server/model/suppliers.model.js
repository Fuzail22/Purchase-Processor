import mongoose from "mongoose";

const purchaseOrderSchema = new mongoose.Schema({
  PO_Number: String,
  Description: String,
});

const supplierSchema = new mongoose.Schema(
  {
    supplier: String,
    purchaseOrders: [purchaseOrderSchema],
  },
  { versionKey: false }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

export { Supplier };
