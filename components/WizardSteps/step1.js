import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components

import styles from '../../styles/Styles.module.scss';
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";

import customSelectStyle from "../../assets/js/customSelectStyle.js";
import customCheckboxRadioSwitch from "../../assets/js/customCheckboxRadioSwitch.js";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
  },
  outer: {
    margin: "0 auto !important",
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
};

const Step1 = React.forwardRef((props, ref) => {
  const [renew, setrenew] = React.useState(false);
  const [firstnew, setfirstnew] = React.useState(false);
  const sendState = () => {
    return {
      renew,
      firstnew,
    };
  };
  const isValidated = () => {
    return true;
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
    <div className={styles.hidediv}>
      <h4 className={classes.infoText}>Are you renewing your license or is this a new license request?</h4>
      <GridContainer justify="center">
        <GridItem item={true} xs={12} sm={12} md={12} lg={10}>
          <GridContainer item sm={8} className={classes.outer}>
            <GridItem item={true} xs={12} sm={6}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={() => setrenew(!renew)}
                  checkedIcon={
                    <i aria-hidden
                      className={
                        "fas fa-redo-alt " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  icon={
                    <i aria-hidden
                      className={
                        "fas fa-redo-alt " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>Renew</h6>
              </div>
            </GridItem>
            
            <GridItem item={true} xs={12} sm={6}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={() => setfirstnew(!firstnew)}
                  checkedIcon={
                    <i aria-hidden
                      className={"fas fa-plus " + classes.iconCheckboxIcon}
                    />
                  }
                  icon={
                    <i aria-hidden
                      className={"fas fa-plus " + classes.iconCheckboxIcon}
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>New</h6>
              </div>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
});
Step1.propTypes = {
  classes: PropTypes.object,
};
Step1.displayName = 'Step1';
export default withStyles(style)(Step1);
