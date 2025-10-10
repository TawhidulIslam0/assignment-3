/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0.00,  // Start balance at zero
      creditList: [],        // Start with empty credits
      debitList: [],         // Start with empty debits
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update user's name after Log In button clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser});
  }

  // Add new credit and recalculate balance
  addCredit = (credit) => {
    const newCreditList = [...this.state.creditList, credit];
    this.setState({
      creditList: newCreditList,
      accountBalance: this.calculateAccountBalance(newCreditList, this.state.debitList),
    });
  }

  // Add new debit and recalculate balance
  addDebit = (debit) => {
    const newDebitList = [...this.state.debitList, debit];
    this.setState({
      debitList: newDebitList,
      accountBalance: this.calculateAccountBalance(this.state.creditList, newDebitList),
    });
  }

  // Calculate balance as sum of credits minus sum of debits
  calculateAccountBalance = (creditList = [], debitList = []) => {
    const totalCredits = creditList.reduce((sum, credit) => sum + credit.amount, 0);
    const totalDebits = debitList.reduce((sum, debit) => sum + debit.amount, 0);
    return (totalCredits - totalDebits).toFixed(2);
  }

  // Render the app with routes and props
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );
    const CreditsComponent = () => (
      <Credits 
        credits={this.state.creditList} 
        addCredit={this.addCredit} 
        accountBalance={this.state.accountBalance} 
      />
    );
    const DebitsComponent = () => (
      <Debits 
        debits={this.state.debitList} 
        addDebit={this.addDebit} 
        accountBalance={this.state.accountBalance} 
      />
    );

    return (
      // basename name path
      <Router basename="/assignment-3">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
