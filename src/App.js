import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    email: '',
    phoneNumber: '',
    amount: '',
  };

  onChangeHandler = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    })
  }

  payWithPaystack = (event) => {
    event.preventDefault();

    const { email, phoneNumber, amount } = this.state;

    const handler = window.PaystackPop.setup({
      key: 'pk_test_f73187eaf08e1d3576872d1b3bda71cd4c9c0fe9',
      email,
      amount,
      metadata: {
        custom_fields: [
          {
            display_name: 'Phemmz Mcllroy',
            variable_name: 'Mobile Number',
            value: phoneNumber
          }
        ]
      },
      callback: (response) => {
        alert(`Success. Transaction ref is ${response.reference}`);
      },
      onClose: () => {
        alert('Window Closed');
      }
    });

    handler.openIframe();
  }

  render() {
    const { email, phoneNumber, amount } = this.state;

    return (
      <div className="App">
        <form className="form__card" onSubmit={this.payWithPaystack}>
          <h3>Checkout</h3>
          <div className="form__group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email address"
              onChange={this.onChangeHandler}
              value={email}
              required
            />
          </div>
          <div className="form__group">
            <label>Phone Number</label>
            <input
              name="phoneNumber"
              type="number"
              placeholder="Enter phone number"
              onChange={this.onChangeHandler}
              value={phoneNumber}
              required
            />
          </div>
          <div className="form__group">
            <label>Amount</label>
            <input
              name="amount"
              type="number"
              placeholder="Enter amount"
              onChange={this.onChangeHandler}
              value={amount}
              required
            />
          </div>
          <button className="pay__btn">
            Checkout With Paystack
          </button>
        </form>
      </div>
    );
  }
}

export default App;
