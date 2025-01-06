import React, { useState } from "react";

const blankPlantForm = {
  name: "",
  image: "",
  price: ""
}

function NewPlantForm({ onAddNewPlant }) {
  const [plantForm, setPlantForm] = useState(blankPlantForm)

  function handleChange(e){
    const name = e.target.name
    // const value = name === "price" ? Number(e.target.value) : e.target.value
    const value = e.target.value

    setPlantForm({
      ...plantForm,
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
      body: JSON.stringify(plantForm)
    })
    .then(r=>r.json())
    .then(newPlant=>{
      setPlantForm(blankPlantForm)
      onAddNewPlant(newPlant)
    })
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={plantForm.name} placeholder="Plant name" onChange={handleChange}/>
        <input type="text" name="image" value={plantForm.image} placeholder="Image URL" onChange={handleChange}/>
        <input type="number" name="price" value={plantForm.price} step="0.01" placeholder="Price" onChange={handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
