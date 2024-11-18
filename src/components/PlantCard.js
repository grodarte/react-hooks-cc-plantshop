import React from "react";
import { useState } from "react";

function PlantCard({ plant }) {
  const [inStock, setInStock] = useState(true)
  const {id, image, name, price} = plant

  function handleClick(){
    setInStock(false)
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={handleClick}>In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
