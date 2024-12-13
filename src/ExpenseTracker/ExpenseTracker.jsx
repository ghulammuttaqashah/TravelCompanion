import React, { useState, useEffect } from "react";

function ExpenseTracker() {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const generateID = () => Math.floor(Math.random() * 100000000);

  const addTransaction = (e) => {
    e.preventDefault();
    if (text.trim() === "" || amount.trim() === "") {
      alert("Please add a text and amount");
      return;
    }
    const newTransaction = {
      id: generateID(),
      text,
      amount: +amount,
    };
    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
  };

  const clearExpenses = () => {
    if (window.confirm("Are you sure you want to delete your history, income, and expenses?")) {
      setTransactions([]); 
    }
  };
  

  const calculateBalance = () =>
    transactions.reduce((acc, item) => acc + item.amount, 0).toFixed(2);

  const calculateIncome = () =>
    transactions
      .filter((item) => item.amount > 0)
      .reduce((acc, item) => acc + item.amount, 0)
      .toFixed(2);

  const calculateExpense = () =>
    Math.abs(
      transactions
        .filter((item) => item.amount < 0)
        .reduce((acc, item) => acc + item.amount, 0)
    ).toFixed(2);

  const styles = {
    container: {
      margin: "30px auto",
      width: "400px",
      textAlign: "center",
    },
    card: {
      backgroundColor: "#fff",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
      padding: "20px",
      margin: "20px 0",
      borderRadius: "8px",
    },
    balance: {
      fontSize: "32px",
      margin: "10px 0",
    },
    incExpContainer: {
      display: "flex",
      justifyContent: "space-between",
      margin: "20px 0",
    },
    childDiv: {
      flex: 1,
      textAlign: "center",
      padding: "10px",
    },
    firstChildDiv: {
      borderRight: "1px solid #dedede",
    },
    money: {
      fontSize: "20px",
      fontWeight: "bold",
      margin: "5px 0",
    },
    plus: {
      color: "#2ecc71",
    },
    minus: {
      color: "#c0392b",
    },
    formControl: {
      margin: "10px 0",
    },
    input: {
      border: "1px solid #dedede",
      borderRadius: "2px",
      marginTop: "20px",
      padding: "10px",
      width: "100%",
    },
    btn: {
      backgroundColor: "#243642",
      color: "#E2F1E7",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      fontWeight: "bold",
      width: "40%",
      cursor: "pointer",
      marginTop: "10px",
    },
    list: {
      listStyleType: "none",
      padding: "0",
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      backgroundColor: "#fff",
      margin: "10px 0",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    },
    clearBtn: {
      backgroundColor: "#e74c3c",
      color: "#fff",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Expense Tracker</h2>
      <div style={styles.card}>
        <h4>Your Balance</h4>
        <h1 style={styles.balance}>${calculateBalance()}</h1>
        <div style={styles.incExpContainer}>
          <div style={{ ...styles.childDiv, ...styles.firstChildDiv }}>
            <h4>Income</h4>
            <p style={{ ...styles.money, ...styles.plus }}>
              +${calculateIncome()}
            </p>
          </div>
          <div style={styles.childDiv}>
            <h4>Expense</h4>
            <p style={{ ...styles.money, ...styles.minus }}>
              -${calculateExpense()}
            </p>
          </div>
        </div>
      </div>

      <h3>History</h3>
      <ul style={styles.list}>
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            style={{
              ...styles.listItem,
              borderRight: `5px solid ${
                transaction.amount < 0 ? "#c0392b" : "#2ecc71"
              }`,
            }}
          >
            {transaction.text}
            <span>
              {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount)}
            </span>
          </li>
        ))}
      </ul>

      <h2>Add New Transaction</h2>
      <form onSubmit={addTransaction}>
        <div style={styles.formControl}>
          <label htmlFor="text" style={{ fontWeight: "bold" }}>
            Text
          </label>
          <input
            type="text"
            id="text"
            style={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div style={styles.formControl}>
          <label
            htmlFor="amount"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginLeft: "15px",
            }}
          >
            Amount (negative - expense, positive - income)
          </label>
          <input
            type="number"
            id="amount"
            style={styles.input}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button type="submit" style={styles.btn}>
          Add Transaction
        </button>
      </form>

      <button style={styles.clearBtn} onClick={clearExpenses}>
        Clear Expenses
      </button>
    </div>
  );
}

export default ExpenseTracker;