import styled from "styled-components";

export default styled.div`
  .credit-card {
    border-bottom: 1px solid #D3D3D3;
    box-shadow: 0px 0px 2px 2px rgb(0 0 0 / 2%);
    padding: 7px;
    border-radius: 3px;
    font-size: 12px;

    &.StripeElement--focus {
      border: 1px solid #ffcc00;
      box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.02);
    }
  }

  .card-error {
    background: #ea4335;
    color: #fff;
    padding: 20px;
    border-radius: 3px;
    margin-top: 10px;
  }

  .token {
    background: #eee;
    padding: 20px;
    border-radius: 3px;
    font-size: 16px;
    color: #444;
  }
`;