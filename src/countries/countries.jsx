import React, { useEffect, useState } from "react";
import axios from "axios";
import "./countriesStyle.css";

export default function countriesSearch() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [inp, setInp] = useState("");
// eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);
// eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/name/${inp}`
        );
        setData(res.data);
        console.log(res.data);
      } catch (err) {
        if (err.response.status === 404 && inp !== "") setData([]);
        console.log(err);
      }
    }
    getData();
  }, [inp]);

  return (
    <div>
      <input
        type="text"
        value={inp}
        onChange={(e) => {
          setInp(e.target.value);
        }}
      />
      <div className="flag">
        {data.map((item) => (
          <div
            key={item.ccn3}
            className="countryCard"
            style={{ border: "1px solid" }}
          >
            <img
              className="image"
              src={item.flags.svg}
              alt={item.flags.alt}
              height={"100px"}
              width={"100px"}
            />
            <p>{item.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
