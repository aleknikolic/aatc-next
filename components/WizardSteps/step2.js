import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import PictureUpload from "../CustomUpload/PictureUpload.js";
import CustomInput from "../CustomInput/CustomInput.js";

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

const Step1 = React.forwardRef((props, ref) => {
  const [firstname, setfirstname] = React.useState("");
  const [firstnameState, setfirstnameState] = React.useState("");
  const [company, setcompany] = React.useState("");
  const [companyState, setcompanyState] = React.useState("");
  const [lastname, setlastname] = React.useState("");
  const [lastnameState, setlastnameState] = React.useState("");
  const [email, setemail] = React.useState("");
  const [emailState, setemailState] = React.useState("");
  const stateFunctions = {
    setemailState: (value) => setemailState(value),
    setemail: (value) => setemail(value),
    setlastnameState: (value) => setlastnameState(value),
    setlastname: (value) => setlastname(value),
    setfirstnameState: (value) => setfirstnameState(value),
    setfirstname: (value) => setfirstname(value),
    setcompanyState: (value) => setcompanyState(value),
    setcompany: (value) => setcompany(value),
  };
  const sendState = () => {
    return {
      firstname,
      firstnameState,
      company,
      companyState,
      lastname,
      lastnameState,
      email,
      emailState,
    };
  };
  // function that returns true if value is email, false otherwise
  const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  const change = (event, stateName, type, stateNameEqualTo, maxValue) => {
    switch (type) {
      case "email":
        if (verifyEmail(event.target.value)) {
          stateFunctions["set" + stateName + "State"]("success");
        } else {
          stateFunctions["set" + stateName + "State"]("error");
        }
        break;
      case "length":
        if (verifyLength(event.target.value, stateNameEqualTo)) {
          stateFunctions["set" + stateName + "State"]("success");
        } else {
          stateFunctions["set" + stateName + "State"]("error");
        }
        break;
      default:
        break;
    }
    stateFunctions["set" + stateName](event.target.value);
  };
  const isValidated = () => {
    if (
      companyState === "success" &&
      firstnameState === "success" &&
      lastnameState === "success" &&
      emailState === "success"
    ) {
      return true;
    } else {
      if (companyState !== "success") {
        setcompanyState("error");
      }
      if (firstnameState !== "success") {
        setfirstnameState("error");
      }
      if (lastnameState !== "success") {
        setlastnameState("error");
      }
      if (emailState !== "success") {
        setemailState("error");
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
  return (
    <GridContainer justify="center" sm={8} className={classes.outer}>
      <GridItem xs={12} sm={12}>
        <h4 className={classes.infoText}>
          Information for the Licensed User
        </h4>
      </GridItem>
      {/* <GridItem xs={12} sm={4}>
        <PictureUpload />
      </GridItem> */}
      <GridItem xs={12} sm={12}>
      <CustomInput
          success={companyState === "success"}
          error={companyState === "error"}
          labelText={
            <span>
              Company
            </span>
          }
          id="company"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => change(event, "company", "length", 8),
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                {/* { <Face className={classes.inputAdornmentIcon} />} */}
              </InputAdornment>
            ),
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={6}>
        <CustomInput
          success={firstnameState === "success"}
          error={firstnameState === "error"}
          labelText={
            <span>
              First Name
            </span>
          }
          id="firstname"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => change(event, "firstname", "length", 3),
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                {/* <Face className={classes.inputAdornmentIcon} /> */}
              </InputAdornment>
            ),
          }}
        />
        </GridItem>
        <GridItem xs={12} sm={6}>
        <CustomInput
          success={lastnameState === "success"}
          error={lastnameState === "error"}
          labelText={
            <span>
              Last Name
            </span>
          }
          id="lastname"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => change(event, "lastname", "length", 3),
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                {/* <RecordVoiceOver className={classes.inputAdornmentIcon} /> */}
              </InputAdornment>
            ),
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={6}>
        <CustomInput
          success={emailState === "success"}
          error={emailState === "error"}
          labelText={
            <span>
              Email 
            </span>
          }
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => change(event, "email", "email"),
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                {/* <Email className={classes.inputAdornmentIcon} /> */}
              </InputAdornment>
            ),
          }}
        />
        </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={6}>
        <CustomInput
          success={emailState === "success"}
          error={emailState === "error"}
          labelText={
            <span>
              Phone Number
            </span>
          }
          id="phone"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => change(event, "phone", "phone"),
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                {/* <Email className={classes.inputAdornmentIcon} /> */}
              </InputAdornment>
            ),
          }}
        />
      </GridItem>
    </GridContainer>
  );
});

Step1.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step1);
