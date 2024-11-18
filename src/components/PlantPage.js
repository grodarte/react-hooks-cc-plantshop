import React from "react";
import { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")

  const displayPlants = !search ? plants : plants.filter(plant=>plant.name.toLowerCase().includes(search))

  function handleNewPlant(newPlant){
    setPlants([
      ...plants,
      newPlant
    ])
  }

  function handleSearch(e){
    setSearch(e.target.value.toLowerCase())
  }

  useEffect(()=>{
    fetch(`http://localhost:6001/plants`)
    .then(r=>r.json())
    .then(plantData=>setPlants(plantData))
  }, [])

  return (
    <main>
      <NewPlantForm onNewPlant={handleNewPlant}/>
      <Search search={search} onSearch={handleSearch}/>
      <PlantList plants={displayPlants}/>
    </main>
  );
}

export default PlantPage;
