import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant, onUpdatePlant }) {
  const [inStock, setInStock] = useState(true)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [newPrice, setNewPrice] = useState("")
  const {id, image, name, price} = plant

  function handleStockChange(){
    setInStock(inStock=>!inStock)
  }

  function toggleFormVisibility(){
    setNewPrice("")
    setIsFormVisible(isFormVisible=>!isFormVisible)
  }

  function changePrice(e){
    setNewPrice(e.target.value)
  }

  function updatePrice(e){
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        price: newPrice
      })
    })
    .then(r=>r.json())
    .then(updatedPlant=>{
      onUpdatePlant(updatedPlant)
      toggleFormVisibility()
    })
  }

  function deletePlant(){
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
    .then(r=>r.json())
    .then(()=>onDeletePlant(plant))
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isFormVisible && (
        <form onSubmit={updatePrice}>
          <label>Enter a new price:</label>
          <input type="number" name="price" step="0.01" placeholder="New Price" value={newPrice} onChange={changePrice}/>
          <button type="submit" style={{color: "white", background: "green"}}>Submit</button>
          <button type="button" onClick={toggleFormVisibility}>Cancel</button>
        </form>
      )}
      <button style={{background: "rgb(121, 226, 242)"}} onClick={toggleFormVisibility}>Update Price</button>
      {inStock ? (
        <button className="primary" onClick={handleStockChange}>In Stock</button>
      ) : (
        <button onClick={handleStockChange}>Out of Stock</button>
      )}
      <button style={{color: "red"}} onClick={deletePlant}>Delete</button>
    </li>
  );
}

export default PlantCard;
