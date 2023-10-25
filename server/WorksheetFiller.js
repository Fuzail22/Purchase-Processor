import XLSX from "xlsx";
let lastColumn, numberOfRowsFilled, po_number, supplier, decsription;

// function getHeader() {
//   for (let start = 65; start <= lastColumn.charCodeAt(0); start++) {
//     let currentColumn = String.fromCharCode(start);
//     if (worksheet[`${currentColumn}1`].v.toLowerCase() == "po number")
//       po_number = `${currentColumn}1`;
//     if (worksheet[`${currentColumn}1`].v.toLowerCase() == "supplier")
//       supplier = `${currentColumn}1`;
//     if (worksheet[`${currentColumn}1`].v.toLowerCase() == "description")
//       decsription = `${currentColumn}1`;
//   }
// }/opt/render/project/src/server/

function fillWorksheet(fname) {
  po_number = null;
  supplier = null;
  decsription = null;
  const filename = `uploaded/${fname}`;
  // const filename = `uploaded\\${fname}`;
  var workbook = XLSX.readFile(filename);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  numberOfRowsFilled = Math.max(
    ...Object.keys(worksheet).map((cellAddress) =>
      cellAddress.replace(/[^0-9]/g, "")
    )
  );
  console.log("rows filled ", numberOfRowsFilled);
  lastColumn = XLSX.utils.encode_col(
    Math.max(
      ...Object.keys(worksheet).map((cellAddress) =>
        XLSX.utils.decode_col(cellAddress.replace(/[^A-Z]/g, ""))
      )
    )
  );
  console.log("columns filled ", lastColumn);
  console.log("columns filled charcode ", lastColumn.charCodeAt(0));
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  const numRows = range.e.r + 1;
  const numCols = range.e.c + 1;

  for (let start = 65; start <= lastColumn.charCodeAt(0); start++) {
    let currentColumn = String.fromCharCode(start);
    if (worksheet[`${currentColumn}1`].v.toLowerCase() == "po number")
      po_number = `${currentColumn}`;
    if (worksheet[`${currentColumn}1`].v.toLowerCase() == "supplier")
      supplier = `${currentColumn}`;
    if (worksheet[`${currentColumn}1`].v.toLowerCase() == "description")
      decsription = `${currentColumn}`;
    for (let i = 2; i < numberOfRowsFilled; i++) {
      if (
        worksheet[`${currentColumn}${i + 1}`] == undefined ||
        worksheet[`${currentColumn}${i + 1}`].v == ""
      ) {
        // worksheet[`${currentColumn}${i + 1}`] ={ t: "s", v: "", r: "<t/>", h: "", w: "" };
        worksheet[`${currentColumn}${i + 1}`] =
          worksheet[`${currentColumn}${i}`];
      }
    }
  }
  for (let start = 65; start <= lastColumn.charCodeAt(0); start++) {
    let currentColumn = String.fromCharCode(start);
    for (let i = 2; i < numberOfRowsFilled; i++) {
      if (worksheet[`${currentColumn}${i}`].v == undefined)
        console.log(currentColumn, i);
    }
  }
  XLSX.writeFile(workbook, `modified/${filename}`);
}
export { numberOfRowsFilled, fillWorksheet, po_number, supplier, decsription };
