import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import stripe from "../lib/stripe.js";
import { Input, Col, Row, Form, Button, Modal } from "antd";
import styleclass from "../styles/Styles.module.scss";
import { environment } from "../lib/environment.js";
import axios from "axios";

import StyledIndex from "../pages/stripe.css.js";

class Checkout extends React.Component {
  state = {
    token: "",
    cardError: "",
    amount: "",
  };

  componentDidMount() {
    var key = this.state;
    console.log("current step",  key);
    const elements = stripe.elements();
    this.creditCard = elements.create("card", {
      style: {
        base: {
          // fontSize: "18px",
        },
      },
    });

    /// Calculate the subsription amount based on the current date ///

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    if (mm <= 3) {
      this.setState({ amount: "765" });
    } else if (mm >= 4 && mm <= 6) {
      this.setState({ amount: "510" });
    } else if (mm >= 7 && mm <= 8) {
      this.setState({ amount: "255" });
    } else if (mm >= 9 || mm <= 12) {
      this.setState({ amount: "1020" });
    }

    today = mm + "/" + dd + "/" + yyyy;

    this.creditCard.on("change", (event) => {
      if (event.error) {
        this.setState({ cardError: event.error.message });
      } else {
        this.setState({ cardError: "" });
      }
    });

    this.creditCard.mount(".credit-card");
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = this.props.formdata;

    const welcome = formData.welcome;
    let isNew;
    if (welcome.firstnew === true) {
      isNew = true;
    } else if (welcome.firstnew === false || welcome.renew === true) {
      isNew = false;
    }

    const registration = formData.registration;
    let company = registration.company;
    let firstName = registration.firstname;
    let lastName = registration.lastname;
    let email = registration.email;
    let phone = registration.phone;

    const type = formData.type;
    var keys = Object.keys(type);
    var filteredtypes = keys.filter((key) => { return type[key] });
    filteredtypes = filteredtypes.toString();

    let payerCompany = event.target.payerCompany.value;
    let payerFirstName = event.target.payerFirstName.value;
    let payerLastName = event.target.payerLastName.value;
    let payerEmail = event.target.payerEmail.value;
    let payerPhone = event.target.payerPhone.value;
    let payerAmount = event.target.payerAmount.value;
    let payerCardName = `${payerFirstName} ${payerLastName}`;

    const stripeFee = +(payerAmount * 100).toFixed();
    stripe.createToken(this.creditCard).then(({ error, token }) => {
      if (error) {
        this.setState({ cardError: error.message });
      } else {
        let trans = {
          amount: stripeFee, //3745,
          source: token.id, //don't send the entire token only the id //
          currency: "usd",
          receipt_email: payerEmail, //'dhardy@utherwise.com',
          statement_descriptor: "AATC License Fee",
          shipping: {
            name: `${payerCardName}`, //'Carol Testor',
            address: {
              line1: "", //'40 Pine Ridge Road',
              city: null, //'Atlanta',
              state: null, // 'GA',
              postal_code: null, //'30080',
              country: "USA",
            },
          },
        };
        let url = environment.stripe.charges; //'https://lvngbook-api.azurewebsites.net/api/charges';
        let apiUrl = environment.registrations.charges;
        axios.post(url, trans).then((response) => {
          let resData = response.data;
          let stripeId = resData.id;
          let stripeTxn = resData.balance_transaction;
          let stripeLast4 = resData.source.last4;
          let allData = {
            data: {
              isNew: isNew,
              userCompany: company,
              userFirstName: firstName,
              userLastName: lastName,
              userPhone: phone,
              userEmail: email,
              classification: filteredtypes,
              payerCompany: payerCompany,
              payerFirstName: payerFirstName,
              payerLastName: payerLastName,
              payerEmail: payerEmail,
              payerPhone: payerPhone,
              stripeId: stripeId,
              stripeTxn: stripeTxn,
              stripeLast4: stripeLast4,
              stripeAmount: payerAmount
            },
          };
          axios.post(apiUrl, allData).then((res) => {
            const submittingBtn = document.getElementById('stripeSubmitting');
            submittingBtn.click();
            console.log("check state", this.props);
          });
        });
      }
    });
  };

  render() {
    const { cardError, token, amount } = this.state;
    return (
      <Form
        id="stripePay"
        onSubmit={this.handleSubmit}
        className={styleclass.stripeform}
      >
        <Form.Item
          label="Name on card"
          colon={false}
          className={styleclass.stripeformitem}
        >
          <Input name="payerCardName" />
        </Form.Item>
        <Form.Item
          label="Card"
          colon={false}
          className={styleclass.stripeformitem}
        >
          {/* <CardElement options={cardOptions} /> */}
          <StyledIndex>
            <div className="credit-card" id="checkCard"/>
            {cardError && <p className="card-error">{cardError}</p>}
            {/* <button
          onClick={() => this.handleSubmit()}
          className="btn btn-primary btn-lg mt-4"
        >
          Get Token
        </button> */}
            {token && (
              <div className="mt-4">
                <p className="token">{token}</p>
              </div>
            )}
          </StyledIndex>
        </Form.Item>
        <Form.Item
          label="Company"
          colon={false}
          className={styleclass.stripeformitem}
        >
          <Input name="payerCompany" />
        </Form.Item>
        <Input.Group>
          <Row gutter={12} className="d-flex">
            <Col span={6} className="col-md-6">
              <Form.Item
                label="Firstname"
                colon={false}
                className={styleclass.stripeformitem}
              >
                <Input name="payerFirstName" />
              </Form.Item>
            </Col>
            <Col span={6} className="col-md-6">
              <Form.Item
                label="Lastname"
                colon={false}
                className={styleclass.stripeformitem}
              >
                <Input name="payerLastName" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12} className="d-flex">
            <Col span={6} className="col-md-6">
              <Form.Item
                label="Email"
                colon={false}
                className={styleclass.stripeformitem}
              >
                <Input name="payerEmail" />
              </Form.Item>
            </Col>
            <Col span={6} className="col-md-6">
              <Form.Item
                label="Phone"
                colon={false}
                className={styleclass.stripeformitem}
              >
                <Input name="payerPhone" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Renewel Amount"
            colon={false}
            className={styleclass.stripeformitem}
          >
            <Row gutter={12} className="d-flex">
              $ <Input 
                  name="payerAmount" 
                  id="payerAmount" 
                  disabled={true}
                  value={amount} />
            </Row>
          </Form.Item>
        </Input.Group>
        <Button
          type="primary"
          htmlType="submit"
          className="btn btn-primary btn-lg mt-4"
          id="btnStripe"
        >
          Submit
        </Button>
      </Form>
    );
  }
}

Checkout.propTypes = {
  // prop: PropTypes.string.isRequired,
};
Checkout.displayName = "Checkout";
export default Checkout;
