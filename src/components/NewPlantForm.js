import React from "react";
import { useState } from "react";

function NewPlantForm( { onPlantSubmit } ) {
  const [formData, setFormData] = useState(
    {
      name: "",
      image: "",
      price: ""
    }
  )

  function handleFormChange(e){
    const name = e.target.name
    const value = e.target.value

    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handlePlantSubmit(e){
    e.preventDefault()
    const newPlantInfo = {
      ...formData,
      price: parseFloat(formData["price"])
    }
    fetch(`http://localhost:6001/plants`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({...newPlantInfo})
    })
    .then(r=>r.json())
    .then(newPlant=>{
      onPlantSubmit(newPlant)
      setFormData({
        ...formData,
        name: "",
        image: "",
        price: ""
      })
    })
  }
  
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handlePlantSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Plant name" />
        <input type="text" name="image" value={formData.image} onChange={handleFormChange} placeholder="Image URL" />
        <input type="number" name="price" value={formData.price} onChange={handleFormChange} step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
