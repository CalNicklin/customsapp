import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { generateInfo, summariseInfo } from "./api/gpt";
import { postData, tqamAPI } from "./api/backend";

function App() {
  const [commodity, setCommodity] = useState("");
  const [country, setCountry] = useState("FR");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [commodityCode, setCommodityCode] = useState("");
  const [rule, setRule] = useState("");
  const [, setCommodityData] = useState("");
  const [error, setError] = useState(false);

  const getRuleOfOrigin = async (commodityCode: string, country: string) => {
    return axios
      .get(
        `https://www.trade-tariff.service.gov.uk/api/v2/rules_of_origin_schemes/${commodityCode}/${country}`
      )
      .then((response) => {
        if (response.status === 200) {
          setRule(response.data.included);
        } else if (response.status === 404) {
          throw new Error("Commodity not found");
        } else {
          throw new Error("Error");
        }
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  const getCommodityData = async (commodityCode: string) => {
    return axios
      .get(
        `https://www.trade-tariff.service.gov.uk/api/v2/commodities/${commodityCode}`
      )
      .then((response) => {
        if (response.status === 200) {
          setCommodityData(JSON.stringify(response.data.data.attributes));
        } else if (response.status === 404) {
          throw new Error("Commodity not found");
        } else {
          throw new Error("Error");
        }
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  const renderResults = (response) => {
    // response will be an array of objects with n number of keys
    // each object has a 'attributes' key which itself is an object
    // the 'attributes' object has n number of keys
    // for each key in the 'attributes' object, render a div with the key and value

    if (response.length === 0) {
      return <div>No results</div>;
    }

    return response.map((result) => {
      const attributes = result.attributes;

      return (
        <div>
          {Object.keys(attributes).map((key) => {
            return (
              <div>
                <span>{key}:</span>
                <p>{attributes[key]}</p>
              </div>
            );
          })}
        </div>
      );
    });
  };

  const getData = async (data) => {
    try {
      const res = await postData(data);
      setAnswer(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={viteLogo} className="App-logo" alt="logo" />
      </header>
      <main>
        <input
          type="text"
          value={commodityCode}
          onChange={(e) => setCommodityCode(e.target.value)}
        />
        <button
          onClick={() => (
            setCommodity(""),
            setRule(""),
            setError(false),
            generateInfo(commodityCode).then((res) => {
              setCommodity(res);
              getRuleOfOrigin(res, country);
              getCommodityData(res);
            })
          )}
        >
          Search
        </button>
        <input
          type="text"
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
          onClick={() => (
            getRuleOfOrigin(commodity, country), getCommodityData(commodity)
          )}
        >
          Get Commodity Data
        </button>
        <div style={{ display: "block" }}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={() => getData(question)}>GetData</button>
          <div>{answer ? answer : 'awaiting query...'}</div>
        </div>
        {error && <div>Error</div>}
        <div>{commodityCode}</div>
        {renderResults(rule)}
      </main>
    </div>
  );
}

export default App;
