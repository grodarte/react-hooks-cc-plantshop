import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const [soldOut, setSoldOut] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [newPrice, setNewPrice] = useState("")
  const {id, name, image, price} = plant

  function handleSellOut(){
    setSoldOut(soldOut=>!soldOut)
  }

  function handleUpdateVisibility(){
    setShowUpdate(showUpdate=>!showUpdate)
    setNewPrice("")
  }

  function handleUpdatePrice(e){
    e.preventDefault()

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify({ price: newPrice})
    })
    .then(r=>r.json())
    .then(updatedPlant=>{
      onUpdatePlant(updatedPlant)
      handleUpdateVisibility()
    })
  }

  function handleDeletePlant(){
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
      {!showUpdate ? (
        <>
          {!soldOut ? (
            <button className="primary" onClick={handleSellOut}>In Stock</button>
          ) : (
            <button onClick={handleSellOut}>Out of Stock</button>
          )}
          <button style={{backgroundColor: "yellow"}} onClick={handleUpdateVisibility}>Update</button>
          <button onClick={handleDeletePlant}>Delete</button>
        </>
      ) : (
        <>
          <form onSubmit={handleUpdatePrice}>
            <input type="text" placeholder="New Price" onChange={(e)=>setNewPrice(e.target.value)}/>
            <button type="submit">Save</button>
          </form>
          <button onClick={handleUpdateVisibility}>Cancel</button>
        </>
      )
      }
    </li>
  );
}

export default PlantCard;
