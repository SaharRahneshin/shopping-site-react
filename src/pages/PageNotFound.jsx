import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import styles from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <div className={styles.pageNotFound}>
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/products">
          <FaArrowLeft />
          <span>Back to Home</span>
          </Link>

    </div>
  )
}

export default PageNotFound