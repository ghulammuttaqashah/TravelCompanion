function CurrencyDropDown({ currencies, currency, setCurrency, title = "" }) {
    return (
      <div>
        <label htmlFor={title} style={{color:"#243642"}}>{title}</label>
        <div style={{marginTop:"5px"}}>
          <select
            name={title}
            id={title}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)} // Update the state here
            style={{
              width: "80px",
              border: "2px solid #243642",
              borderRadius: "5px",
              boxShadow: "5px 5px 5px hsla(0, 0%, 0%, 0.1)",
            }}
          >
            {currencies.map((currencyOption) => (
              <option value={currencyOption} key={currencyOption}>
                {currencyOption}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
  
  export default CurrencyDropDown;
  