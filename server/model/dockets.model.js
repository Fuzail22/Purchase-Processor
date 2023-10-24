import mongoose from "mongoose";

// const purchaseOrderSchema = new mongoose.Schema({
//   PO_Number: String,
//   Description: String,
// });

const docketSchema = new mongoose.Schema(
  {
    name: String,
    start_time: String,
    end_time: String,
    no_of_hours_worked: Number,
    rate_per_hour: Number,
    supplierName: String,
    description: String,
    po_nummber: String,
  },
  { versionKey: false }
);

const Docket = mongoose.model("Docket", docketSchema);

export { Docket };
