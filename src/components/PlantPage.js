import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import { useEffect, useState } from "react";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")

  useEffect(()=>{
    fetch(`http://localhost:6001/plants`)
    .then(r=>r.json())
    .then(plantData=>setPlants(plantData))
  }, [])

  const displayPlants = plants.filter(plant=>plant.name.toLowerCase().includes(search.toLowerCase()))

  function handleSearch(e){
    setSearch(e.target.value)
  }

  function handlePlantSubmit(newPlant){
    const newPlantList = [
      ...plants,
      newPlant
    ]
    setPlants(newPlantList)
  }

  function handleDeletePlant(deletedPlant){
    fetch(`http://localhost:6001/plants/${deletedPlant.id}`, {
      method: "DELETE"
    })
    .then(r=>r.json())
    .then(()=>{
      const newPlantList = plants.filter(plant=> plant.id !== deletedPlant.id)
      setPlants(newPlantList)
    })
  }

  function handleUpdatePlant(updatedPlant){
    // map through plants and update price
    const updatedPlantList = plants.map(plant=>{
      if(plant.id === updatedPlant.id){
        return updatedPlant
      } else {
        return plant
      }
    })
    setPlants(updatedPlantList)
  }

  return (
    <main>
      <NewPlantForm onPlantSubmit={handlePlantSubmit}/>
      <Search search={search} onSearch={handleSearch}/>
      <PlantList plants={displayPlants} onDeletePlant={handleDeletePlant} onUpdatePlant={handleUpdatePlant}/>
    </main>
  );
}

export default PlantPage;
