/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      accountBalance: 0.00,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  componentDidMount() {
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then(res => res.json())
      .then(data => {
        this.setState({ creditList: data }, () => {
          this.setState({ accountBalance: this.calculateAccountBalance(this.state.creditList, this.state.debitList) });
        });
      })
      .catch(err => console.error('Error fetching credits:', err));

    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then(res => res.json())
      .then(data => {
        this.setState({ debitList: data }, () => {
          this.setState({ accountBalance: this.calculateAccountBalance(this.state.creditList, this.state.debitList) });
        });
      })
      .catch(err => console.error('Error fetching debits:', err));
  }

  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser});
  }

  addCredit = (credit) => {
    const newCreditList = [...this.state.creditList, credit];
    this.setState({
      creditList: newCreditList,
      accountBalance: this.calculateAccountBalance(newCreditList, this.state.debitList),
    });
  }

  addDebit = (debit) => {
    const newDebitList = [...this.state.debitList, debit];
    this.setState({
      debitList: newDebitList,
      accountBalance: this.calculateAccountBalance(this.state.creditList, newDebitList),
    });
  }

  calculateAccountBalance = (creditList = [], debitList = []) => {
    const totalCredits = creditList.reduce((sum, credit) => sum + credit.amount, 0);
    const totalDebits = debitList.reduce((sum, debit) => sum + debit.amount, 0);
    return (totalCredits - totalDebits).toFixed(2);
  }

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
