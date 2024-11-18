import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants }) {
  const plantElements = plants.map(plant=><PlantCard key={plant.id} plant={plant}/>)

  return (
    <ul className="cards">{plantElements}</ul>
  );
}

export default PlantList;
