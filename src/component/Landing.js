import React, { useEffect, useState } from "react";
import { getCoin } from "../services/api";
import Loader from "./Loader";
import Coin from "./Coin";

import styles from "./Landing.module.css";

const Landing = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getCoin();
      console.log(data);
      setCoins(data);
    };
    fetchAPI();
  }, []);
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const searchedCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <input
        className={styles.input}
        type="text"
        placeholder="Search..."
        value={search}
        onChange={searchHandler}
      />
      <div className={styles.coinContainer}>
        {coins.length ? (
          searchedCoins.map((coin) => (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              marketCap={coin.market_cap}
              priceChange={coin.market_cap_change_percentage_24h}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};
export default Landing;
