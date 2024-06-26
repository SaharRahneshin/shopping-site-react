import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { filterProducts, getInitialQuery, searchProducts } from "../helpers/helper";
import { useProducts } from "../context/ProductContext";
import Card from "../components/Card";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import SideBar from "../components/SideBar";
import styles from "./ProductsPage.module.css"


function ProductsPage() {
  const products = useProducts();
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products, searchParams]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");

    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
    const timeout = setTimeout(() => {
      setNoResults(finalProducts.length === 0);
      setLoading(false); 
    }, 1000);

    return () => clearTimeout(timeout); 

  }, [query, products]);

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {noResults ? (
            <p className={styles.noResults}>Your search did not match any products.</p>
          ) :
          !displayed.length ? (<Loader />) : (
              displayed.map((p) => (
              <Card key={p.id} data={p} />
          ))
        )}
        </div>
        <SideBar query={query} setQuery={setQuery} />
      </div>
    </>
  )
}

export default ProductsPage;