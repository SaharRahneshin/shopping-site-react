import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import BasketCard from "../components/BasketCard";
import BasketSidebar from "../components/BasketSidebar";
import image from "../assets/empty.png";
import styles from "./CheckoutPage.module.css";


function CheckoutPage() {
  const [state, dispatch] = useCart();

  const clickHandler = ( type, payload ) => {
    dispatch({ type, payload });
  }
  if (!state.itemsCounter){
    return (
      <div className={styles.message}>
        <p>Sorry! You didn't choose anything!</p>
        <img src={image} alt="Empty Basket" />
        <Link to="/products">
          <FaArrowLeft />
          <span>Back to Shop</span>
          </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
     <BasketSidebar state={state} clickHandler={clickHandler} />
      <div className={styles.products}>
        {state.selectedItems.map(product => 
        <BasketCard key={product.id} data={product} clickHandler={clickHandler} />)}
      </div>
    </div>
  )
}

export default CheckoutPage