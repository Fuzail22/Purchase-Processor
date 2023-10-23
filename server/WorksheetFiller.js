import XLSX from "xlsx";
const filename = "Uploaded\\export29913.xlsx";
var workbook = XLSX.readFile(filename);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const numberOfRowsFilled = Math.max(
  ...Object.keys(worksheet).map((cellAddress) =>
    cellAddress.replace(/[^0-9]/g, "")
  )
);
const lastColumn = XLSX.utils.encode_col(
  Math.max(
    ...Object.keys(worksheet).map((cellAddress) =>
      XLSX.utils.decode_col(cellAddress.replace(/[^A-Z]/g, ""))
    )
  )
);
let start = 65;
for (start; start <= lastColumn.charCodeAt(0); start++) {
  let currentColumn = String.fromCharCode(start);
  for (let i = 2; i < numberOfRowsFilled; i++) {
    if (worksheet[`${currentColumn}${i + 1}`].v == "") {
      worksheet[`${currentColumn}${i + 1}`] = worksheet[`${currentColumn}${i}`];
    }
  }
}

XLSX.writeFile(workbook, `modified\\${filename}`);

export { numberOfRowsFilled };