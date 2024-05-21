import React from "react";
import { useState } from "react";

function PlantCard( {plant, onDeletePlant, onUpdatePlant} ) {
  const {id, name, image, price} = plant
  const [inStock, setInStock] = useState(true)

  function handleUpdatePrice(plant){
    const newPrice = prompt("Enter the new price:")
    const updatedPlant = {
      ...plant,
      ["price"]: parseFloat(newPrice)
    }

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(updatedPlant)
    })
    .then(r=>r.json())
    .then(plantData=> onUpdatePlant(plantData))
  }

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
      <button onClick={()=>{onDeletePlant(plant)}}>Delete</button>
      <button onClick={()=>{handleUpdatePrice(plant)}}>Update Price</button>

    </li>
  );
}

export default PlantCard;
