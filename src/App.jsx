import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";
import CartProvider from "./context/CartContext";
import ProductsProvider from "./context/ProductContext";
import ProductsPage from "./pages/ProductsPage";
import DetailsPage from "./pages/DetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import PageNotFound from "./pages/PageNotFound";


function App() {
  
  return (
    <CartProvider>
      <ProductsProvider>
       <Layout>
          <Routes>
           <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsPage />} />
           <Route path="/products/:id" element={<DetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
           <Route path="*" element={<PageNotFound />} />
         </Routes>
       </Layout>
      </ProductsProvider>
    </CartProvider>
  
  )
}

export default App;
