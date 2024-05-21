import React from "react";

function NewPlantForm( {formData, onFormChange, onPlantSubmit} ) {
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={onPlantSubmit}>
        <input type="text" name="name" value={formData.name} onChange={onFormChange} placeholder="Plant name" />
        <input type="text" name="image" value={formData.image} onChange={onFormChange} placeholder="Image URL" />
        <input type="number" name="price" value={formData.price} onChange={onFormChange} step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
