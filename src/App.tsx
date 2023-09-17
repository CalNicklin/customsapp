import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [commodity, setCommodity] = useState("");
  const [country, setCountry] = useState("GB");
  const [rule, setRule] = useState("");
  const [commodityData, setCommodityData] = useState("");
  const [error, setError] = useState(false);

  const getRuleOfOrigin = async (commodityCode: string, country: string) => {
    return axios
      .get(
        `https://www.trade-tariff.service.gov.uk/api/v2/rules_of_origin_schemes/${commodityCode}/${country}`
      )
      .then((response) => {
        if (response.status === 200) {
          setRule(response.data.included[6].attributes.rule);
        } else if (response.status === 404) {
          throw new Error("Commodity not found");
        } else {
          throw new Error("Error");
        }
      })
      .catch((error) => {
        setError(true);
        throw new Error(error);
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
        throw new Error(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={viteLogo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
        {error && <div>Error</div>}
        <div>{rule}</div>
        <div>{commodityData}</div>
      </header>
    </div>
  );
}

export default App;
