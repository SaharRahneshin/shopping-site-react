import { Link } from "react-router-dom";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

import { useCart } from "../context/CartContext";
import styles from "./Layout.module.css";


function Layout({ children }) {
  const [state] = useCart();
  return (
    <>
        <header className={styles.header}>
            <Link to="/products">Online Shopping</Link>
            <Link to="/checkout">
            <div>
                <PiShoppingCartSimpleBold />
                {!!state.itemsCounter && (<span>{state.itemsCounter}</span>)}
              </div>
            </Link>
        </header>
        {children}
        <footer className={styles.footer}> 
          <p>Developed by Sahar 🥰</p>
        </footer>
    </>
  )
}

export default Layout;