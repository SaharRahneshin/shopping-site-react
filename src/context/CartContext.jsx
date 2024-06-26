import { createContext, useContext, useReducer } from "react";
import { sumProducts } from "../helpers/helper";

const initialState = {
    selectedItems : [],
    itemsCounter: 0,
    total: 0,
    checkout: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            if (!state.selectedItems.find(item => item.id === action.payload.id)) {
                return {
                    ...state,
                    selectedItems: [
                        ...state.selectedItems,
                        { ...action.payload, quantity: 1 }
                    ],
                    ...sumProducts([...state.selectedItems, { ...action.payload, quantity: 1 }]),
                    checkout: false,
                };
            }
            return {
                ...state,
                ...sumProducts(state.selectedItems),
                checkout: false,
            };

        case "REMOVE_ITEM":
            const newSelectedItems = state.selectedItems.filter(
                (item) => item.id !== action.payload.id
            );
            return {
                ...state,
                selectedItems: [...newSelectedItems],
                ...sumProducts(newSelectedItems),
            };

        case "INCREASE":
            const increaseIndex = state.selectedItems.findIndex(
                (item) => item.id === action.payload.id
            );
            const increasedItems = [...state.selectedItems];
            increasedItems[increaseIndex] = {
                ...increasedItems[increaseIndex],
                quantity: increasedItems[increaseIndex].quantity + 1,
            };
            return {
                ...state,
                selectedItems: increasedItems,
                ...sumProducts(increasedItems),
            };

        case "DECREASE":
            const decreaseIndex = state.selectedItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if (state.selectedItems[decreaseIndex].quantity === 1) {
                // If quantity is 1, remove the item instead of decrementing
                return {
                    ...state,
                    selectedItems: state.selectedItems.filter(
                        (item) => item.id !== action.payload.id
                    ),
                    ...sumProducts(state.selectedItems.filter(
                        (item) => item.id !== action.payload.id
                    )),
                };
            }
            const decreasedItems = [...state.selectedItems];
            decreasedItems[decreaseIndex] = {
                ...decreasedItems[decreaseIndex],
                quantity: decreasedItems[decreaseIndex].quantity - 1,
            };
            return {
                ...state,
                selectedItems: decreasedItems,
                ...sumProducts(decreasedItems),
            };

        case "CHECKOUT":
            return {
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                checkout: true
            };

        default:
            throw new Error("Invalid Action!");
    }
};

const CartContext = createContext();

function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
        {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
   const { state, dispatch } = useContext(CartContext);
   return [state, dispatch];

}

export default CartProvider;
export { useCart };