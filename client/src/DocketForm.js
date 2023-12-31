import { useCallback, useRef, useEffect, useState } from "react";
import axios from "axios";
let suppliersdata;
function Docket(props) {
  const [suppliers, setSuppliers] = useState(false);
  const [po, setPO] = useState(false);
  const [posdata, setPosdata] = useState([]);

  const nameRef = useRef(null),
    startRef = useRef(null),
    endRef = useRef(null),
    hoursRef = useRef(null),
    rateRef = useRef(null),
    supplierRef = useRef(null),
    poRef = useRef(null);

  useEffect(() => {
    props.setLoading(true);
    axios
      .get("https://purchaseprocessor.onrender.com/allsuppliers")
      .then((response) => {
        suppliersdata = response.data;
        console.log(suppliersdata);
        setSuppliers(true);
        props.setLoading(false);
      })
      .catch((err) => {
        console.log(
          "The following error occured while fetching suppliers: ",
          err
        );
        props.setLoading(false);
      });
  }, []);

  const getPOs = useCallback((props, e) => {
    props.setLoading(true);
    const suppName = e.target.value;
    axios
      .get(`https://purchaseprocessor.onrender.com/supplier?supp=${suppName}`)
      .then((response) => {
        console.log(response.data.purchaseOrders);
        setPosdata(response.data.purchaseOrders);
        setPO(true);
        props.setLoading(false);
      })
      .catch((err) => {
        console.log(
          "The following error occured while fetching suppliers: ",
          err
        );
        props.setLoading(false);
      });
  }, []);
  const createHandler = useCallback((props, e) => {
    props.setLoading(true);
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
      .post(`https://purchaseprocessor.onrender.com/docket`, formData)
      .then((response) => {
        console.log(response);
        document.getElementById("docketForm").reset();
        props.setDocket(false);
        props.getDockets();
        props.setLoading(false);
      })
      .catch((err) => {
        console.log(
          "The following error occured while creating the docket: ",
          err
        );
        props.setLoading(false);
      });
  }, []);
  return (
    <form id="docketForm" onSubmit={(event) => createHandler(props, event)}>
      <label className="overlay-label">
        Name:
        <input
          className="overlay-input"
          type="text"
          ref={nameRef}
          required
        ></input>
      </label>
      <label className="overlay-label">
        Start time:
        <input
          className="overlay-input"
          type="time"
          ref={startRef}
          required
        ></input>
      </label>
      <label className="overlay-label">
        End time:
        <input
          className="overlay-input"
          type="time"
          ref={endRef}
          required
        ></input>
      </label>
      <label className="overlay-label">
        Hours Worked
        <input
          className="overlay-input"
          type="number"
          ref={hoursRef}
          required
        ></input>
      </label>
      <label className="overlay-label">
        Rate Per Hour
        <input
          className="overlay-input"
          type="number"
          ref={rateRef}
          required
        ></input>
      </label>
      {suppliers && (
        <label className="overlay-label">
          Supplier:
          <select
            className="overlay-input"
            onChange={(event) => getPOs(props, event)}
            defaultValue={"DEFAULT"}
            ref={supplierRef}
            required
          >
            <option value="" hidden>
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
        <label className="overlay-label">
          PO:
          <br />
          <select
            className="overlay-input"
            defaultValue={"DEFAULT"}
            ref={poRef}
            required
          >
            <option value="" hidden>
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
      <div className="overlay-buttons">
        <button type="submit" className="overlay-button">
          Save
        </button>
        <button
          type="button"
          className="overlay-button"
          onClick={() => props.setDocket(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Docket;
