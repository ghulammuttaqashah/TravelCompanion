import { useEffect, useState } from "react";
import CurrencyDropDown from "./dropdown";

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("PKR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Fetch all supported currencies from the API
  const fetchCurrencies = async () => {
    try {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/2a8bd7a561d8de6176b05a5b/latest/USD`);
      const data = await res.json();
      if (data.result === "success") {
        const currencyList = Object.keys(data.conversion_rates);  // Get currency codes from conversion_rates
        setCurrencies(currencyList);
      } else {
        throw new Error("Failed to fetch currencies.");
      }
    } catch (error) {
      alert("Error fetching currencies: " + error);
    }
  };

  // Convert the currency
  const convertCurrency = async () => {
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/2a8bd7a561d8de6176b05a5b/pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      const data = await res.json();
      if (data.result === "success") {
        setConvertedAmount(data.conversion_result);
      } else {
        throw new Error("Failed to convert currency.");
      }
    } catch (error) {
      alert("Error converting currency: " + error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const swapCurrencies=()=>
    {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);   
    }

  const cardStyle = {
    card: {
      border: "1px solid #629584",
      borderRadius: "10px",
      boxShadow: "5px 5px 5px hsla(0, 0%, 0%, 0.1)",
      padding: "20px",
      margin: "10px",
      maxWidth: "450px",
      display: "inline-block",
      marginTop: "60px",

    },
  };

  return (
    <div className="main" style={{ display: "flex",alignItems:"center" ,justifyContent: "center", marginBottom:"60px" }}>
      <div className="card" style={cardStyle.card}>
        <h2 style={{ color: "#243642", fontWeight: "bolder", textAlign:"center"}}>Currency Converter</h2>
        <div style={{display:"flex",alignItems:"center", gap:"30px"}}>
          <CurrencyDropDown
            currencies={currencies}
            title="From"
            currency={fromCurrency}
            setCurrency={setFromCurrency}
          />
          
          <img onClick={swapCurrencies} src="./src/currencyConverter/arrow.png" alt="" srcset="" width={"30px"} height={"30px"} style={{alignSelf:"center"}}/>
          <CurrencyDropDown
            currencies={currencies}
            title="To"
            currency={toCurrency}
            setCurrency={setToCurrency}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label htmlFor="amount" style={{ display: "block", color: "#243642" }}>
            Amount:
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              height: "20px",
              border: "1px solid #629584",
              borderRadius: "5px",
              boxShadow: "5px 5px 5px hsla(0, 0%, 0%, 0.1)",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
          <button
            onClick={convertCurrency}
            style={{
              backgroundColor: "#243642",
              color: "#E2F1E7",
              fontSize: "1.2vw",
              padding: "10px 20px",
              border: "none",
              borderRadius: "50px",
              fontWeight: "700",
              cursor: "pointer",
              marginLeft: "20px",
            }}
          >
            Convert
          </button>
        </div>
        <div style={{ marginTop: "15px", fontWeight: "700", textAlign: "right", color: "#629584" }}>
          Converted Amount: {convertedAmount ? `${convertedAmount} ${toCurrency}` : "N/A"}
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
