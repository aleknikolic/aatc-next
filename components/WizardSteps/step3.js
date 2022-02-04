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

const Step2 = React.forwardRef((props, ref) => {
  const [custodial, setcustodial] = React.useState("");
  const [hvac, sethvac] = React.useState(false);
  const [engg, setengg] = React.useState(false);
  const [mep, setmep] = React.useState(false);
  const [construction, setconstruction] = React.useState(false);
  const [firealarm, setfirealarm] = React.useState(false);
  const [other, setother] = React.useState(false);
  const sendState = () => {
    return {
      custodial,
      hvac,
      engg,
      mep,
      construction,
      firealarm,
      other,
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
      <h4 className={classes.infoText}>Company Work Classifications</h4>
      <GridContainer justify="center">
        <GridItem item={true} xs={12} sm={12} md={12} lg={10}>
          <GridContainer item sm={8} className={classes.outer}>
            <GridItem item={true} xs={12} sm={6}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={() => setcustodial(!custodial)}
                  checkedIcon={
                    <i aria-hidden
                      className={
                        "fas fa-brush " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  icon={
                    <i aria-hidden
                      className={
                        "fas fa-brush " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>CUSTODIAL</h6>
              </div>
            </GridItem>
            <GridItem item={true} xs={12} sm={6}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={() => sethvac(!hvac)}
                  checkedIcon={
                    <i aria-hidden
                      className={
                        "fas fa-fan " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  icon={
                    <i aria-hidden
                      className={
                        "fas fa-fan " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>HVAC</h6>
              </div>
            </GridItem>
            <GridItem item={true} xs={12} sm={6}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={() => setengg(!engg)}
                  checkedIcon={
                    <i aria-hidden
                      className={
                        "fas fa-hard-hat " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  icon={
                    <i aria-hidden
                      className={
                        "fas fa-hard-hat " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>ENGINEERING SERVICES</h6>
              </div>
            </GridItem>
            <GridItem item={true} xs={12} sm={6}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={() => setmep(!mep)}
                  checkedIcon={
                    <i aria-hidden
                      className={
                        "fas fa-bolt " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  icon={
                    <i aria-hidden
                      className={
                        "fas fa-bolt " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>MEP</h6>
              </div>
            </GridItem>
            <GridItem item={true} xs={12} sm={6}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={() => setconstruction(!construction)}
                  checkedIcon={
                    <i aria-hidden
                      className={
                        "fas fa-tools " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  icon={
                    <i aria-hidden
                      className={
                        "fas fa-tools " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>GENERAL CONSTRUCTION</h6>
              </div>
            </GridItem>
            <GridItem item={true} xs={12} sm={6}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={() => setfirealarm(!firealarm)}
                  checkedIcon={
                    <i aria-hidden
                      className={
                        "fas fa-fire " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  icon={
                    <i aria-hidden
                      className={
                        "fas fa-fire " + classes.iconCheckboxIcon
                      }
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>FIRE ALARM PREVENTION</h6>
              </div>
            </GridItem>
            {/* <GridItem item={true} xs={12} sm={4}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={() => setcode(!code)}
                  checkedIcon={
                    <i
                      className={"fas fa-terminal " + classes.iconCheckboxIcon}
                    />
                  }
                  icon={
                    <i
                      className={"fas fa-terminal " + classes.iconCheckboxIcon}
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>Code</h6>
              </div>
            </GridItem> */}
            <GridItem item={true} xs={12} sm={6}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={() => setother(!other)}
                  checkedIcon={
                    <i aria-hidden
                      className={"fas fa-tools " + classes.iconCheckboxIcon}
                    />
                  }
                  icon={
                    <i aria-hidden
                      className={"fas fa-tools " + classes.iconCheckboxIcon}
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>OTHER</h6>
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

Step2.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step2);
