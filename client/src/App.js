import "./App.css";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import Docket from "./DocketForm";
import Papa from "papaparse";
import saveAs from "file-saver";
function App() {
  const [docket, setDocket] = useState(false);
  const [dockets, setDockets] = useState([]);

  let getDockets = useCallback(() => {
    axios
      .get("http://localhost:6001/docket")
      .then((response) => {
        setDockets(response.data);
      })
      .catch((err) => {
        console.log(
          "The following error occured while fetching dockets: ",
          err
        );
      });
  }, []);

  useMemo(() => getDockets(), [getDockets]);

  function handleFileChange(e) {
    if (!e.target.files[0]) {
      console.log("no file selected");
      return;
    }
    const selectedFile = e.target.files[0];
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:6001/upload", formData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Error uploading file", error);
      });
  }
  function jsonToCsv(data) {
    const csv = Papa.unparse(data);
    return csv;
  }
  const handleDownload = () => {
    const docketDownload = dockets.map(({ _id, ...rest }) => rest);
    const csv = jsonToCsv(docketDownload);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "dockets.csv");
  };
  return (
    <div className="App">
      <header>
        <label>
          Upload PO File
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileChange}
          />
        </label>
        <h1>Welcome to Purchase Processor Web App</h1>{" "}
        <div className="buttons">
          <button onClick={() => setDocket(true)}>Create Docket</button>{" "}
          <button className="download" onClick={handleDownload}>
            Download
          </button>
        </div>
      </header>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Hours Worked</th>
              <th>Rate Per Hour</th>
              <th>Supplier Name</th>
              <th>Purchase Order</th>
              <th>PO Number</th>
            </tr>
          </thead>
          <tbody>
            {dockets.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.name}</td>
                <td>{doc.start_time}</td>
                <td>{doc.end_time}</td>
                <td>{doc.no_of_hours_worked}</td>
                <td>{doc.rate_per_hour}</td>
                <td>{doc.supplierName}</td>
                <td>{doc.description}</td>
                <td>{doc.po_nummber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {docket && (
        <div className="Overlay">
          <div className="overlay-form">
            <Docket setDocket={setDocket} getDockets={getDockets} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
