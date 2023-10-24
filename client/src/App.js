import "./App.css";
import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

let suppliersdata;

function App() {
  const [suppliers, setSuppliers] = useState(false);
  const [po, setPO] = useState(false);
  const [posdata, setPosdata] = useState([]);
  // const [docket,setDocket]=useState(false);
  const [dockets, setDockets] = useState([]);
  const nameRef = useRef(null),
    startRef = useRef(null),
    endRef = useRef(null),
    hoursRef = useRef(null),
    rateRef = useRef(null),
    supplierRef = useRef(null),
    poRef = useRef(null);

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
  useEffect(() => {
    axios
      .get("http://localhost:6001/allsuppliers")
      .then((response) => {
        suppliersdata = response.data;
        console.log(suppliersdata);
        setSuppliers(true);
        // console.log(suppliers.map((sup) => sup.supplier));
        // console.log(typeof suppliers);
      })
      .catch((err) => {
        console.log(
          "The following error occured while fetching suppliers: ",
          err
        );
      });
  }, []);
  const getPOs = useCallback((e) => {
    // console.log(e.target.value);
    const suppName = e.target.value;
    axios
      .get(`http://localhost:6001/supplier?supp=${suppName}`)
      .then((response) => {
        console.log(response.data.purchaseOrders);
        setPosdata(response.data.purchaseOrders);
        setPO(true);
        // console.log(suppliers.map((sup) => sup.supplier));
        // console.log(typeof suppliers);
      })
      .catch((err) => {
        console.log(
          "The following error occured while fetching suppliers: ",
          err
        );
      });
  }, []);
  const createHandler = useCallback((e) => {
    e.preventDefault();
    const [description, poNumber] = poRef.current.value.split(",");
    console.log(nameRef.current.value);
    console.log(startRef.current.value);
    console.log(endRef.current.value);
    console.log(hoursRef.current.value);
    console.log(rateRef.current.value);
    console.log(supplierRef.current.value);
    console.log(description);
    console.log(poNumber);
    const formData = {
      name: nameRef.current.value,
      start_time: startRef.current.value,
      end_time: endRef.current.value,
      no_of_hours_worked: hoursRef.current.value,
      rate_per_hour: rateRef.current.value,
      supplierName: supplierRef.current.value,
      description: description,
      po_nummber: poNumber,
    };
    axios
      .post(`http://localhost:6001/docket`, formData)
      .then((response) => {
        console.log(response);
        document.getElementById("docketForm").reset();
      })
      .catch((err) => {
        console.log(
          "The following error occured while creating the docket: ",
          err
        );
      });
  }, []);

  return (
    <div className="App">
      <header>
        <button>Create Docket</button>
      </header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start time</th>
            <th>End time:</th>
            <th>Hours Worked</th>
            <th>Rate Per Hour</th>
            <th>supplierName</th>
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
      <form id="docketForm" onSubmit={createHandler}>
        <label>
          Name:
          <input type="text" ref={nameRef} required></input>
        </label>
        <label>
          Start time:
          <input type="time" ref={startRef} required></input>
        </label>
        <label>
          End time:
          <input type="time" ref={endRef} required></input>
        </label>
        <label>
          Hours Worked
          <input type="number" ref={hoursRef} required></input>
        </label>
        <label>
          Rate Per Hour
          <input type="text" ref={rateRef} required></input>
        </label>
        {suppliers && (
          <label>
            Supplier:
            <select
              onChange={getPOs}
              defaultValue={"DEFAULT"}
              ref={supplierRef}
              required
            >
              <option value={"DEFAULT"} hidden>
                Select the Supplier
              </option>
              {suppliersdata.map((sup) => {
                return (
                  <option key={sup.supplier} value={sup.supplier}>
                    {sup.supplier}
                  </option>
                );
              })}
            </select>
          </label>
        )}
        {po && (
          <label>
            PO:
            <select defaultValue={"DEFAULT"} ref={poRef} required>
              <option value={"DEFAULT"} hidden>
                Select the Description
              </option>
              {posdata.map((po) => {
                return (
                  <option key={po._id} value={[po.Description, po.PO_Number]}>
                    {po.Description}-{po.PO_Number}
                  </option>
                );
              })}
            </select>
          </label>
        )}
        {/* <input type="submit" /> */}
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  );
}

export default App;
