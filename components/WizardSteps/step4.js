import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";


import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm.js';

const stripePromise = loadStripe('pk_test_c8V2s9WTAzMvx814xcIc8OFD'); 

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  inputAdornment: {
    position: "relative",
  },
  outer: {
    margin: "0 auto !important",
  },
};

const Step4 = React.forwardRef((props, ref) => {
  const [stripe, setstripe] = React.useState("");
  const [stripeState, setstripeState] = React.useState("");
  const stateFunctions = {
    setstripeState: (value) => setstripeState(value),
    setstripe: (value) => setstripe(value),
  };
  const sendState = () => {
    return {
      stripe,
      stripeState,
    };
  };
  // function that returns true if value is email, false otherwise
  const isValidated = () => {
    if (
      stripeState === "success"
    ) {
      return true;
    } else {
      if (stripeState !== "success") {
        setstripeState("error");
      }
    }
    return false;
  };
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    sendState: () => {
      return sendState();
    },
  }));
  const { classes } = props;
  const formdata = props.allStates;
  return (
<GridContainer justify="center" item sm={9} className={classes.outer}>
      <GridItem item={true} xs={12} sm={12}>
        <h4 className={classes.infoText}>
          Let{"'"}s start with the basic information (with validation)
        </h4>
      </GridItem>
      <Elements stripe={stripePromise}>
        <CheckoutForm
        success={stripeState === "success"}
        error={stripeState === "error"}
        formdata={formdata}
        />
      </Elements>
</GridContainer>
  );
});

Step4.propTypes = {
  classes: PropTypes.object,
};
Step4.displayName = 'Step4';
export default withStyles(style)(Step4);
