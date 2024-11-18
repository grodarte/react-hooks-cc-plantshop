import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant }) {
  const [inStock, setInStock] = useState(true)
  const {id, image, name, price} = plant

  function handleStockChange(){
    setInStock(inStock=>!inStock)
  }

  function handleClick(){
    // show form to submit new price
  }

  function updatePrice(e){
    //preventDefault
    // patch request
    // callback to update state
  }

  function deletePlant(){
    //delete request
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
    .then(r=>r.json())
    .then(()=>onDeletePlant(plant))
    //callback to update state
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={handleStockChange}>In Stock</button>
      ) : (
        <button onClick={handleStockChange}>Out of Stock</button>
      )}
      <button style={{background: "rgb(121, 226, 242)"}}>Update Price</button>
      <button style={{color: "red"}} onClick={deletePlant}>Delete</button>
    </li>
  );
}

export default PlantCard;
