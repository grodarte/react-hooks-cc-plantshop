import React, { useState, useEffect } from "react";
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

  function handleNewPlant(newPlant){
    setPlants([
      ...plants,
      newPlant
    ])
  }

  function handleUpdatePlant(updatedPlant){
    console.log(updatedPlant)

    // const newPlantArr = plants.map(plant=>{
    //   if(plant.id === updatedPlant.id){
    //     return updatedPlant
    //   } else {
    //     return plant
    //   }
    // })

    // setPlants(newPlantArr)
  }

  function handleSearch(e){
    setSearch(e.target.value.toLowerCase())
  }

  function handleDeletePlant(deletedPlant){
    const newPlantArr = plants.filter(plant=>plant.id !== deletedPlant.id)

    setPlants(newPlantArr)
  }

  const displayPlants = !search ? plants : plants.filter(plant=>plant.name.toLowerCase().includes(search))

  return (
    <main>
      <NewPlantForm onNewPlant={handleNewPlant}/>
      <Search search={search} onSearch={handleSearch}/>
      <PlantList plants={displayPlants} onDeletePlant={handleDeletePlant}/>
    </main>
  );
}

export default PlantPage;
