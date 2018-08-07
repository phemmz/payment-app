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

  handleRaveCheckout = (event) => {
    event.preventDefault();

    window.getpaidSetup({
      PBFPubKey: process.env.REACT_APP_RAVE_KEY,
      customer_email: 'user@example.com',
      customer_firstname: 'Temi',
      customer_lastname: 'Adelewa',
      custom_description: 'Pay Internet',
      // custom_logo: 'http://localhost/communique-3/skin/frontend/ultimo/communique/custom/images/logo.svg',
      custom_title: 'Communique Global System',
      amount: 2000,
      customer_phone: '234099940409',
      country: 'NG',
      currency: 'NGN',
      txref: 'rave-123456',
      // integrity_hash: "6800d2dcbb7a91f5f9556e1b5820096d3d74ed4560343fc89b03a42701da4f30",
      onclose: () => {},
      callback: (response) => {
        console.log("This is the response returned after a charge", response);
        if (
          response.tx.chargeResponseCode === "00" ||
          response.tx.chargeResponseCode === "0"
        ) {
          // redirect to a success page
        } else {
          // redirect to a failure page.
        }
      }
    });
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
          <div className="checkout__btns">
            <button name="payStack" className="pay__btn">
              Checkout With Paystack
            </button>
            <button name="rave" className="rave__checkout__btn" onClick={this.handleRaveCheckout}>
              Checkout With Rave
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
