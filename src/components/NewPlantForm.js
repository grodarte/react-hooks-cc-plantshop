import React from "react";
import { useState } from "react";

const blankForm = {
  name: "",
  image: "",
  price: "",
}

function NewPlantForm({ onNewPlant }) {
  const [formData, setFormData] = useState(blankForm)

  function handleChange(e){
    const name = e.target.name
    const value = e.target.value

    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(e){
    e.preventDefault()

    fetch(`http://localhost:6001/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify(formData)
    })
    .then(r=>r.json())
    .then(newPlant=>{
        setFormData(blankForm)
        onNewPlant(newPlant)
    })

  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} placeholder="Plant name" onChange={handleChange}/>
        <input type="text" name="image" value={formData.image} placeholder="Image URL" onChange={handleChange}/>
        <input type="number" name="price" value={formData.price} step="0.01" placeholder="Price" onChange={handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
