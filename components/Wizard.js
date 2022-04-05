import React, { useEffect, useState } from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "../components/Button.js";
import Card from "../components/Card.js";

import wizardStyle from "../assets/js/wizardStyle.js";

function Wizard({classes, title, subtitle, color, steps, ...props}) {

  var [color, setColor] = useState(color);
  var [currentStep, setCurrentStep] = useState(0);
  var [nextButton, setNextButton] = useState(steps.length > 1 ? true : false);
  var [previousButton, setPreviousButton] = useState(false);
  var [paymentButton, setPaymentButton] = useState(false);
  var [submittingButton, setSubmittingButton] = useState(false);
  var [finishButton, setFinishButton] = useState(steps.length > 1 ? false : true);
  var [width, setWidth] = useState(steps.length === 1 ? "100%" : "");
  var [movingTabStyle, setMovingTabStyle] = useState({
    transition: "transform 0s",
  });
  var [allStates, setAllStates] = useState({});
  // methods
  var wizard = React.createRef();
  // 
  function updateWidth() {
    refreshAnimation(currentStep);
  }
  // 
  function navigationStepChange(key) {
      if(key === 3){ 
        if (
          steps[1].stepId.isValidated !== undefined &&
          steps[1].stepId.isValidated() === false
        ) {
          setPaymentButton(false);
          setNextButton(true);
        }
        else{
          setPaymentButton(true);
          setNextButton(false);
        }
        
      }
      else {
        setPaymentButton(false);
        setNextButton(true);
      }
    if (props.steps) {
      var validationState = true;
      if (key > currentStep) {
        for (var i = currentStep; i < key; i++) {
          if ([steps[i].stepId].sendState !== undefined) {
            setAllStates({...allStates, [props.steps[i].stepId]: 
              props.steps[i].stepId
            .sendState(),})
          }
          if (
            steps[i].stepId.isValidated !== undefined &&
            steps[i].stepId.isValidated() === false
          ) {
            validationState = false;
            break;
          }
        }
      }
      if (validationState) {
        setCurrentStep(key);
        setNextButton(steps.length > key + 1 ? true : false);
        setPreviousButton(key > 0 ? true : false);
        setFinishButton(steps.length === key + 1 ? true : false);
        refreshAnimation(key);
      }
    }
  }
  // 
  function paymentButtonSubmit() {
    var card = document.getElementById("checkCard");
    if(card.classList.contains('StripeElement--empty') || card.classList.contains('StripeElement--invalid')){
      setPaymentButton(true);
      submittingButton(false);
      nextButton(false);
    }
    else{
      setPaymentButton(false);
      submittingButton(true);
      nextButton(false);
    }
  }
  // 
  function submittingButtonSubmit() {
    setPaymentButton(false);
    submittingButton(false);
    nextButton(false);

    // setPaymentButton(false);
    // nextButton(false);
    if (
      steps[currentStep].stepId.sendState !==
      undefined
    ) {
      setAllStates({
        ...allStates,
        [steps[currentStep].stepId]: 
        steps[currentStep].stepId
        .sendState(),
      })
    }
    var key = currentStep + 1;
    setCurrentStep(key);
    setNextButton(steps.length > key + 1 ? true : false);
    setPreviousButton(key > 0 ? true : false);
    setFinishButton(steps.length === key + 1 ? true : false)
    refreshAnimation(key);
  }
  // 
  function nextButtonClick() {
    if(currentStep === 2) { 
      setPaymentButton(true);
      setNextButton(false);
    }
    if (
      (props.validate &&
        (steps[currentStep].stepId.isValidated !==
          undefined &&
            steps[currentStep].stepId
          .isValidated()) ||
          steps[currentStep].stepId.isValidated ===
            undefined) ||
      props.validate === undefined
    ) {
      if (
        steps[currentStep].stepId.sendState !==
        undefined
      ) {
        setAllStates({
          ...allStates,
          [steps[currentStep].stepId]:
            steps[currentStep].stepId
          .sendState(),
        })
      }
      var key = currentStep + 1;
      setCurrentStep(key);
      setNextButton(steps.length > key + 1 ? true : false);
      setPreviousButton(key > 0 ? true : false);
      setFinishButton(steps.length === key + 1 ? true : false)
      refreshAnimation(key);
    }
  }
  // 
  function previousButtonClick() {
    if (
      steps[currentStep].stepId.sendState !==
      undefined
    ) {
      setAllStates({
        ...allStates,
        [steps[currentStep].stepId]: 
          steps[currentStep].stepId
        .sendState(),
      })
    }
    var key = currentStep - 1;
    if (key >= 0) {
      setCurrentStep(key);
      setNextButton(steps.length > key + 1 ? true : false);
      setPreviousButton(key > 0 ? true : false);
      setFinishButton(steps.length === key + 1 ? true : false)
      refreshAnimation(key);
    }
  }
  // 
  function finishButtonClick() {
    if (
      (props.validate === false &&
        props.finishButtonClick !== undefined) ||
      (props.validate &&
        ((steps[currentStep].stepId.isValidated !==
          undefined &&
            steps[currentStep].stepId
          .isValidated()) ||
          steps[currentStep].stepId.isValidated ===
            undefined) &&
        props.finishButtonClick !== undefined)
    ) {
      setAllStates({
        ...allStates,
        [steps[currentStep].stepId]: 
          steps[currentStep].stepId
        .sendState(),
      })
        props.finishButtonClick(allStates);
    }
  }
  // 
  function refreshAnimation(index) {
    var total = steps.length;
    var li_width = 100 / total;
    var total_steps = steps.length;
    var move_distance =
      wizard.current?.children[0].offsetWidth / total_steps;
    var index_temp = index;
    var vertical_level = 0;

    var mobile_device = window.innerWidth < 600 && total > 3;

    if (mobile_device) {
      move_distance = wizard.current.children[0].offsetWidth / 2;
      index_temp = index % 2;
      li_width = 50;
    }
    setWidth(li_width + "%");

    var step_width = move_distance;
    move_distance = move_distance * index_temp;

    var current = index + 1;

    if (current === 1 || (mobile_device === true && index % 2 === 0)) {
      move_distance -= 8;
    } else if (
      current === total_steps ||
      (mobile_device === true && index % 2 === 1)
    ) {
      move_distance += 8;
    }
    if (mobile_device) {
      vertical_level = parseInt(index / 2, 10);
      vertical_level = vertical_level * 38;
    }
    var movingTabStyle = {
      width: step_width,
      transform:
        "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
      transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)",
    };
    setMovingTabStyle(movingTabStyle);
  }


  // lifecyclles
  useEffect(() => {
    // componentDidMount
    refreshAnimation(0);
    window.addEventListener("resize", updateWidth);
  
    return () => {
      // componentWillUnmount
      window.removeEventListener("resize", updateWidth);
    }
  }, [])
  return (
    <div className={classes.wizardContainer} ref={wizard}>
      <Card className={classes.card}>
        <div className={classes.wizardHeader}>
          <h3 className={classes.title}>{title}</h3>
          <h5 className={classes.subtitle}>{subtitle}</h5>
          <p>Please begin by answering the questions below. Payment can be made at the end of the registration form.</p>
          {/* <p>check</p> */}

        </div>
        <div className={classes.wizardNavigation}>
          <ul className={classes.nav}>
            {steps.map((prop, key) => {
              return (
                <li
                  className={classes.steps}
                  key={key}
                  style={{ width: width }}
                >
                  <a
                    href="#"
                    className={classes.stepsAnchor}
                    onClick={(e) => {
                      e.preventDefault();
                      navigationStepChange(key);
                    }}
                  >
                    {prop.stepName}
                  </a>
                </li>
              );
            })}
          </ul>

          <div
            className={classes.movingTab + " " + classes[color]}
            style={movingTabStyle}
          >
            {steps[currentStep].stepName}
          </div>
        </div>
        <div className={classes.content}>
          {steps.map((prop, key) => {
            const stepContentClasses = cx({
              [classes.stepContentActive]: currentStep === key,
              [classes.stepContent]: currentStep !== key,
            });
            return (
              <div className={stepContentClasses} key={key}>
                <prop.stepComponent
                  innerRef={(node) => (prop.stepId = node)}
                  allStates={allStates}
                />
              </div>
            );
          })}
        </div>
        <div className={classes.footer}>
          <div className={classes.left}>
            {previousButton ? (
              <Button
                className={props.previousButtonClasses}
                onClick={() => previousButtonClick()}
              >
                {props.previousButtonText}
              </Button>
            ) : null}
          </div>
          <div className={classes.right}>
            {!paymentButton && nextButton ? (
              <Button
                color="rose"
                className={props.nextButtonClasses}
                onClick={() => nextButtonClick()}
              >
                {props.nextButtonText}
              </Button>
            ) : null}
            {paymentButton ? (
              <Button
              id='stripePay'
              color="rose"
              onClick={() => {
                const submitBtn = document.getElementById('btnStripe');
                console.log(submitBtn);
                submitBtn.click();
                paymentButtonSubmit()}}
              className={props.nextButtonClasses}
              >
                Submit
              </Button>
            ) : null}
            {submittingButton ? (
              <Button
              id='stripeSubmitting'
              color="rose"
              onClick={() => {
                submittingButtonSubmit()}}
              className={props.nextButtonClasses}
              disabled={true}
              >
                Submitting
              </Button>
            ) : null}
            {finishButton ? (
              <Button
                color="rose"
                className={props.finishButtonClasses}
                onClick={() => finishButtonClick()}
              >
                {props.finishButtonText}
              </Button>
            ) : null}
          </div>
          <div className={classes.clearfix} />
        </div>
      </Card>
    </div>
  );
}



Wizard.defaultProps = {
  color: "rose",
  title: "Here should go your title",
  subtitle: "And this would be your subtitle",
  previousButtonText: "Previous",
  previousButtonClasses: "",
  nextButtonClasses: "",
  nextButtonText: "Next",
  finishButtonClasses: "",
  finishButtonText: "Finish",
};

Wizard.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string.isRequired,
      stepComponent: PropTypes.object.isRequired,
      stepId: PropTypes.string.isRequired,
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  previousButtonClasses: PropTypes.string,
  previousButtonText: PropTypes.string,
  nextButtonClasses: PropTypes.string,
  nextButtonText: PropTypes.string,
  finishButtonClasses: PropTypes.string,
  finishButtonText: PropTypes.string,
  finishButtonClick: PropTypes.func,
  validate: PropTypes.bool,
};

export default withStyles(wizardStyle)(Wizard);
