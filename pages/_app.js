// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'; 
// import "bootstrap/dist/js/bootstrap";
import '../styles/globals.css';

// import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   import("bootstrap/dist/js/bootstrap");
  // }, []);

  return <Component {...pageProps} />
}

export default MyApp
