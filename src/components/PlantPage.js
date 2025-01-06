import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")


  useEffect(()=>{
    fetch(`http://localhost:6001/plants`)
    .then(r=>r.json())
    .then(plantData=>setPlants(plantData))
  }, [])

  // callback fn to pass to form that adds new plant to state
  function handleAddNewPlant(newPlant){
    setPlants([
      ...plants,
      newPlant
    ])
  }

  function handleSearch(e){
    setSearch(e.target.value)
  }

  function handleUpdatePlant(updatedPlant){
    const newPlantList = plants.map(plant=>{
      if(plant.id === updatedPlant.id){
        return updatedPlant
      } else {
        return plant
      }
    })
    setPlants(newPlantList)
  }

  function handleDeletePlant(deletedPlant){
    const newPlantList = plants.filter(plant => plant.id !== deletedPlant.id)
    setPlants(newPlantList)
  }

  const displayItems = !search ? plants : plants.filter(plant=>plant.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <main>
      <NewPlantForm onAddNewPlant={handleAddNewPlant}/>
      <Search search={search} onSearch={handleSearch}/>
      <PlantList plants={displayItems} onUpdatePlant={handleUpdatePlant} onDeletePlant={handleDeletePlant}/>
    </main>
  );
}

export default PlantPage;
