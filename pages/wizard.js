// import type { NextPage } from 'next';
import React from 'react';
// import dynamic from 'next/dynamic';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Styles.module.scss';
import FormCard from "../components/FormCard";
import Wizard from "../components/Wizard.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";

import Step1 from "../components/WizardSteps/step1.js";
import Step2 from "../components/WizardSteps/step2.js";
import Step3 from "../components/WizardSteps/step3.js";
import Step4 from "../components/WizardSteps/step4.js";
import Step5 from "../components/WizardSteps/step5.js";
// import Admin from "layouts/Admin.js";

function WizardView() {
  return (
    <GridContainer justify="center">
      <GridItem item={true} xs={12} sm={8}>
        <Wizard
          validate
          steps={[
            { stepName: "Welcome", stepComponent: Step1, stepId: "welcome" },
            { stepName: "Registeration", stepComponent: Step2, stepId: "registeration" },
            { stepName: "Type", stepComponent: Step3, stepId: "type" },
            { stepName: "Payment", stepComponent: Step4, stepId: "payment" },
            { stepName: "Thank You", stepComponent: Step5, stepId: "thankyou" },
          ]}
          title="Build Your Profile"
          subtitle="This information will let us know more about you."
          finishButtonClick={(e) => console.log(e)}
        />
      </GridItem>
    </GridContainer>
  );
}


export default WizardView;
