import "./App.css";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import Docket from "./DocketForm";

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

  return (
    <div className="App">
      <header>
        <h1>Welcome to Purchase Processor Web App</h1>
        <button onClick={() => setDocket(true)}>Create Docket</button>
      </header>
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
