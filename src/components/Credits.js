/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
==================================================*/
import React from 'react';
import { Link } from 'react-router-dom';

const Credits = (props) => {
  // Handle form submit to add a new credit item
  const handleSubmit = (e) => {
    e.preventDefault();
    const description = e.target.description.value;
    const amount = parseFloat(e.target.amount.value);
    const date = new Date().toISOString();
    props.addCredit({ description, amount, date });
    e.target.reset();
  };

  return (
    <div>
      <h1>Credits</h1>
      {/* Display current account balance */}
      <h3>Balance: ${props.accountBalance}</h3>
      
      {/* List of credit items */}
      <ul>
        {props.credits.map((credit, index) => (
          <li key={index}>
            {credit.description} - ${credit.amount.toFixed(2)} on {credit.date.slice(0, 10)}
          </li>
        ))}
      </ul>

      {/* Form to add new credit */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="description" placeholder="Description" required />
        <input type="number" name="amount" placeholder="Amount" step="0.01" required />
        <button type="submit">Add Credit</button>
      </form>

      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;
