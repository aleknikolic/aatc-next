import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import styleclass from '../styles/Styles.module.scss';
import { Input, Col, Row, Form, Button, Modal } from "antd";
import { useState } from "react";

const CheckoutForm = props => {
  const { getFieldDecorator } = props.form;
  const [isLoading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true);
        const result = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            address: {
              city: values.city,
              line1: values.address,
              postal_code: values.zip,
              state: values.state
            },
            email: "janedoe@example.com",
            name: values.name,
            phone: "555-555-5555"
          }
        });
        await handleStripePaymentMethod(result);
        setLoading(false);
      }
    });
  };

  const handleStripePaymentMethod = async result => {
    if (result.error) {
      Modal.error({
        title: "Error",
        content: result.error.message
      });
    } else {
      const response = await fetch("api/create-customer", {
        method: "POST",
        mode: "same-origin",
        body: JSON.stringify({
          paymentMethodId: result.paymentMethod.id
        })
      });

      const subscription = await response.json();
      handleSubscription(subscription);
    }
  };

  const handleSubscription = subscription => {
    const { latest_invoice } = subscription;
    const { payment_intent } = latest_invoice;

    if (payment_intent) {
      const { client_secret, status } = payment_intent;

      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function(result) {
          if (result.error) {
            // The card was declined (i.e. insufficient funds, card has expired, etc)
            Modal.error({
              title: "Error",
              content: result.error.message
            });
          } else {
            // Success!
            Modal.success({
              title: "Success"
            });
          }
        });
      } else {
        // No additional information was needed
        Modal.success({
          title: "Success"
        });
      }
    } else {
      console.log(`handleSubscription:: No payment information received!`);
    }
  };

  const cardOptions = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#1890ff",
        color: "rgba(0, 0, 0, 0.65)",
        fontWeight: 500,
        fontFamily: "Segoe UI, Roboto, Open Sans, , sans-serif",
        fontSize: "15px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#bfbfbf" }
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee"
      }
    }
  };
  return (
    <Form onSubmit={e => handleSubmit(e)} className={styleclass.stripeform}>
      <Form.Item label="Name on card" colon={false} className={styleclass.stripeformitem}>
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Name is required" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Card" colon={false} className={styleclass.stripeformitem}>
        {getFieldDecorator("card", {
          rules: [{ required: true, message: "Card is required" }]
        })(<CardElement options={cardOptions} />)}
      </Form.Item>
      <Form.Item label="Company" colon={false} className={styleclass.stripeformitem}>
        {getFieldDecorator("company", {
          rules: [{ required: true, message: "Company is required" }]
        })(<Input />)}
      </Form.Item>
      <Input.Group>
        <Row gutter={12} className="d-flex">
          <Col span={6} className="col-md-6">
            <Form.Item label="Firstname" colon={false} className={styleclass.stripeformitem}>
              {getFieldDecorator("firstname", {
                rules: [{ required: true, message: "Name is required" }]
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={6} className="col-md-6">
            <Form.Item label="Lastname" colon={false} className={styleclass.stripeformitem}>
              {getFieldDecorator("lastname", {
                rules: [{ required: true, message: "Name is required" }]
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12} className="d-flex">
          <Col span={6} className="col-md-6">
            <Form.Item label="Email" colon={false} className={styleclass.stripeformitem}>
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Email is required" }]
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={6} className="col-md-6">
            <Form.Item label="Renewel Amount" colon={false} className={styleclass.stripeformitem}>
              {getFieldDecorator("renewel", {
                rules: [{ required: true, message: "Amount is required" }]
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
      </Input.Group>
      {/* <Button
        loading={isLoading}
        type="primary"
        htmlType="submit"
        className="checkout-button"
        disabled={!stripe}
      >
        Submit
      </Button> */}
    </Form>
  );
};
export default Form.create()(CheckoutForm);