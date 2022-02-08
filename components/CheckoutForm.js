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
          fontSize: "18px",
        },
      },
    });

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
          // self.http.post(url,trans).subscribe((result => {
          //   if (result) {
          //     console.log('result from stripe api', result);
          //   }
          // }));
          axios.post(url, trans).then(response => {
            console.log("result from stripe api", response.data)
          })
      }
    });
    
  };

  render() {
    const { cardError, token } = this.state;

    return (
        <Form ref="stripeForm" id="stripePay" onSubmit={this.handleSubmit} className={styleclass.stripeform}>
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
            <Form.Item label="Renewel Amount" colon={false} className={styleclass.stripeformitem}>
              <Input name="payerAmount"/>
            </Form.Item>
          </Col>
        </Row>
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

export default Checkout;