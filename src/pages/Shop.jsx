import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/shop.module.css";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";

function Shop() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("electronics");
  const user = useSelector((state) => state.user.user);
  const cart = user.cart;
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
      });
  }, []);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      })
      .finally(() => setIsLoading(false));
  }, [selectedCategory]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <LoadingSpinner
          width="100"
          height="100"
          colors={["#000", "#000", "#000", "000", "#000"]}
        />
      </div>
    );
  }
  return (
    <main className={styles.mainContainer}>
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        className={styles.selectCategory}
      >
        {categories.map((category) => (
          <option value={category} key={category}>
            {category.toUpperCase()}
          </option>
        ))}
      </select>
      <div className={styles.gridContainer}>
        {items.map((item) => (
          <Card
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            count={item.count}
            cart={cart}
            key={item.id}
          />
        ))}
      </div>
    </main>
  );
}

export default Shop;
