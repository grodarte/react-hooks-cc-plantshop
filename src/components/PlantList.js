import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDeletePlant, onUpdatePlant }) {
  const plantElements = plants.map(plant=><PlantCard key={plant.id} plant={plant} onDeletePlant={onDeletePlant} onUpdatePlant={onUpdatePlant}/>)

  return (
    <ul className="cards">{plantElements}</ul>
  );
}

export default PlantList;
