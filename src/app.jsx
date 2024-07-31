import React, { useEffect } from "react";
import * as styles from "./app.css";
// import styles from "./app.css"; // somehow this doesn't work

const App = () => {
  useEffect(() => {
    console.log("mark", { styles });
  }, [styles]);
  return <h1 className={styles.app}>wsup</h1>;
};

export default App;
