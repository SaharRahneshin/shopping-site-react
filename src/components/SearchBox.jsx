import { useState } from "react";
import { ImSearch } from "react-icons/im";
import { createQueryObject } from "../helpers/helper";

import styles from "./SearchBox.module.css";

function SearchBox({search, setSearch, setQuery}) {
  const [error, setError] = useState("");

    const searchHandler = () => {
      if (!search) {
        setError("Please enter your search");
        return;
    }
      setError("");

      setQuery(query => createQueryObject(query, {search}))
      };

      const handleInputFocus = () => {
        setSearch("");
        setError(""); 
        setQuery(query => createQueryObject(query, { search: "" }));
    };

  return (
    <div className={styles.search}>
        <input 
        type="text" 
        placeholder="Search..." 
        value={search} 
        onChange={e => 
          setSearch(e.target.value.toLocaleLowerCase().trim())}
        onFocus={handleInputFocus}
        />
        <button onClick={searchHandler}><ImSearch /></button>
        {error && <p className={styles.error}>{error}</p>}
  </div>
  )
}

export default SearchBox