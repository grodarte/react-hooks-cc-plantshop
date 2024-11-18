import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDeletePlant }) {
  const plantElements = plants.map(plant=><PlantCard key={plant.id} plant={plant} onDeletePlant={onDeletePlant}/>)

  return (
    <ul className="cards">{plantElements}</ul>
  );
}

export default PlantList;
