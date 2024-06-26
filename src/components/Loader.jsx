import { RotatingLines } from "react-loader-spinner";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
        <RotatingLines 
        width="100px" 
        height="100px" 
        strokeWidth="3" 
        strokeColor="#606c38" 
        />
    </div>
  )
}

export default Loader