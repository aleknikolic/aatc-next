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

const Step5 = React.forwardRef((props, ref) => {
  const [thankyou, setdevelop] = React.useState(false);
  const sendState = () => {
    return {
      thankyou,
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
      <h4 className={classes.infoText}>Thank you for your business.</h4>
      <GridContainer justify="center">
        <GridItem item={true} xs={12} sm={12} md={12} lg={10}>
          <GridContainer item sm={8} className={classes.outer}>
            <GridItem item={true} xs={12} sm={12}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  // onClick={() => setthankyou(!thankyou)}
                  checkedIcon={
                    <i aria-hidden
                      className={"fas fa-check-circle " + classes.iconCheckboxIcon}
                    />
                  }
                  icon={
                    <i aria-hidden
                      className={"fas fa-check-circle " + classes.iconCheckboxIcon}
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                {/* <h6>New</h6> */}
              </div>
              <FormControl fullWidth className={classes.selectFormControl}>
                {/* <InputLabel
                  htmlFor="simple-select-2"
                  className={classes.selectLabel}
                >
                  Choose City
                </InputLabel> */}
                {/* <Select
                  MenuProps={{
                    className: classes.selectMenu,
                  }}
                  classes={{
                    select: classes.select,
                  }}
                  value={simpleSelect}
                  onChange={handleSimple}
                  inputProps={{
                    name: "simpleSelect",
                    id: "simple-select-2",
                  }}
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem,
                    }}
                  >
                    Choose City
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected,
                    }}
                    value="2"
                  >
                    Paris
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected,
                    }}
                    value="3"
                  >
                    Bucharest
                  </MenuItem>
                </Select> */}
              </FormControl>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
});

Step5.propTypes = {
  classes: PropTypes.object,
};
Step5.displayName = 'Step5';
export default withStyles(style)(Step5);
