/*==================================================
src/components/AccountBalance.js

The AccountBalance component displays account balance. It is included in other page views.
==================================================*/
import React, { Component } from 'react';

class AccountBalance extends Component {
  render() {
    // Ensure accountBalance is a number and format it to 2 decimals
    const formattedBalance = Number(this.props.accountBalance).toFixed(2);

    return (
      <div>
        Balance: ${formattedBalance}
      </div>
    );
  }
}

export default AccountBalance;
