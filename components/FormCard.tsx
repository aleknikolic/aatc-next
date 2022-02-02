import styles from "../styles/Styles.module.scss";
import FormTabs from "../components/FormTabs";

export default function FormCard() {
  return (
    <div className="col-md-12 mr-auto ml-auto">
      <div className="wizard-container">
        <div className="card wizard-card">
            <div className="wizard-header">
                <h3 className="wizard-title">  AATC Conditions Registration  </h3>
                <h5>  Contractor Community [Shutdowns]  </h5>
                <p> Please begin by answering the questions below. Payment can be made at the end of the registration form. </p>
            </div>
          <FormTabs></FormTabs>   
        </div>
      </div>
    </div>
  );
}
