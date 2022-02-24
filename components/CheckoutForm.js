import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import stripe from "../lib/stripe.js";
import { Input, Col, Row, Form, Button, Modal } from "antd";
import styleclass from '../styles/Styles.module.scss';
import { environment } from '../lib/environment.js';
import axios from 'axios';

import StyledIndex from "../pages/stripe.css.js";

class Checkout extends React.Component {
  state = {
    token: "",
    cardError: "",
  };

  componentDidMount() {
   
    const elements = stripe.elements();
    this.creditCard = elements.create("card", {
      style: {
        base: {
          // fontSize: "18px",
        },
      },
    });

    this.creditCard.on("change", (event) => {
      if (event.error) {
        this.setState({ cardError: event.error.message });
      } else {
        this.setState({ cardError: "" });
      }
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      if( mm <= 3){
        document.getElementById("payerAmount").value = "765"
      }
      else if( mm >= 4 && mm <= 6 ){
        document.getElementById("payerAmount").value = "510"
      }
      else if( mm >= 7 && mm <= 8 ){
        document.getElementById("payerAmount").value = "255"
      }
      else if( mm >= 9 || mm <= 12 ){
        document.getElementById("payerAmount").value = "1020"
      }
      today = mm + '/' + dd + '/' + yyyy;
    });

    this.creditCard.mount(".credit-card");
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = this.props.formdata;
    
    const welcome = formData.welcome;
    let isNew;
    if(welcome.firstnew === true){
      isNew = true;
    }
    else if(welcome.firstnew === false || welcome.renew === true){
      isNew = false;
    }
    
    const registeration = formData.registeration;
    let company = registeration.company;
    let firstName = registeration.firstname;
    let lastName = registeration.lastname;
    let email = registeration.email;
    let phone = registeration.phone;

    const type = formData.type;
    var keys = Object.keys(type);
    var filteredtypes = keys.filter(function(key) {
      return type[key]
    });
    filteredtypes = filteredtypes.toString();

    let payerCompany = event.target.payerCompany.value;
    let payerFirstName = event.target.payerFirstName.value;
    let payerLastName = event.target.payerLastName.value;
    let payerEmail = event.target.payerEmail.value;
    let payerPhone = event.target.payerPhone.value;
    let payerAmount = event.target.payerAmount.value;
    

  console.log("check step", formData);
        console.log("val", event);
        console.log("get user value", event.target.payerCardName.value) 
        const stripeFee = +(event.target.payerAmount.value * 100).toFixed();
    stripe.createToken(this.creditCard).then(({ error, token }) => {
      if (error) {
        this.setState({ cardError: error.message });
      } else {
        // this.setState({ token: token.id });
        console.log("stripe token", token.id);
        let trans = {
          amount: stripeFee,//3745,
          source: token.id, //don't send the entire token only the id //
          currency: 'usd',
          receipt_email: this.payerEmail?.value, //'dhardy@utherwise.com',
          statement_descriptor: 'AATC License Fee',
          shipping: {
            name: `${this.payerFirstName?.value} ${this.payerLastName?.value}`, //'Carol Testor',
            address: {
              line1: '', //'40 Pine Ridge Road',
              city: null, //'Atlanta',
              state: null, // 'GA',
              postal_code: null, //'30080',
              country: 'USA'
            }
          }
        };
        console.log('trans',trans);
        let url = environment.stripe.charges;//'https://lvngbook-api.azurewebsites.net/api/charges';
        let apiUrl = environment.registrations.charges;
          axios.post(url, trans).then(response => {
            let resData = response.data;
            let stripeId = resData.id;
            let stripeTxn = resData.balance_transaction;
            let stripeLast4 = resData.source.last4;
            let allData = { data: {
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
              stripeAmount: payerAmount,
              createdAt: "2022-02-23T08:31:07.508Z",
              updatedAt: "2022-02-23T08:31:07.508Z",
              createdBy: "dexter",
              updatedBy: "dexter"
            }
            };
            console.log("Data", allData);
              axios.post(apiUrl, allData).then(res => {
                console.log("result", res);
              });
          })
      }
    });
    
  };

  render() {
    const { cardError, token } = this.state;
    return (
        <Form id="stripePay" onSubmit={this.handleSubmit} className={styleclass.stripeform}>
      <Form.Item label="Name on card" colon={false} className={styleclass.stripeformitem}>
        <Input name="payerCardName"/>
      </Form.Item>
      <Form.Item label="Card" colon={false} className={styleclass.stripeformitem}>
        {/* <CardElement options={cardOptions} /> */}
      <StyledIndex>
        <div className="credit-card" />
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
      <Form.Item label="Company" colon={false} className={styleclass.stripeformitem}>
        <Input name="payerCompany"/>
      </Form.Item>
      <Input.Group>
        <Row gutter={12} className="d-flex">
          <Col span={6} className="col-md-6">
            <Form.Item label="Firstname" colon={false} className={styleclass.stripeformitem}>
              <Input name="payerFirstName"/>
            </Form.Item>
          </Col>
          <Col span={6} className="col-md-6">
            <Form.Item label="Lastname" colon={false} className={styleclass.stripeformitem}>
              <Input name="payerLastName"/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12} className="d-flex">
          <Col span={6} className="col-md-6">
            <Form.Item label="Email" colon={false} className={styleclass.stripeformitem}>
              <Input name="payerEmail"/>
            </Form.Item>
          </Col>
          <Col span={6} className="col-md-6">
            <Form.Item label="Phone" colon={false} className={styleclass.stripeformitem}>
              <Input name="payerPhone"/>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Renewel Amount" colon={false} className={styleclass.stripeformitem}>
        <Row gutter={12} className="d-flex">
          $ <Input name="payerAmount" id="payerAmount"/>
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
Checkout.displayName = 'Checkout';
export default Checkout;