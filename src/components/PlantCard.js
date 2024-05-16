import React from "react";
import { useState } from "react";

function PlantCard( {plant} ) {
  const {id, name, image, price} = plant
  const [inStock, setInStock] = useState(true)

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={()=>{setInStock(false)}}>In Stock</button>
      ) : (
        <button onClick={()=>{setInStock(true)}}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
