import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import { useEffect, useState } from "react";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")
  const [formData, setFormData] = useState(
    {
      name: "",
      image: "",
      price: ""
    }
  )

  function handleFormChange(e){
    const name = e.target.name
    const value = e.target.value

    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handlePlantSubmit(e){
    e.preventDefault()
    const newPlantInfo = {
      ...formData,
      price: parseFloat(formData["price"])
    }
    fetch(`http://localhost:6001/plants`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({...newPlantInfo})
    })
    .then(r=>r.json())
    .then(newPlant=>{
      const newPlantList = [
        ...plants,
        newPlant
      ]
      setPlants(newPlantList)
      setFormData({
        ...formData,
        name: "",
        image: "",
        price: ""
      })
    })
  }

  useEffect(()=>{
    fetch(`http://localhost:6001/plants`)
    .then(r=>r.json())
    .then(plantData=>setPlants(plantData))
  }, [])

  const displayPlants = plants.filter(plant=>plant.name.toLowerCase().includes(search.toLowerCase()))

  function handleSearch(e){
    setSearch(e.target.value)
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
      <NewPlantForm formData={formData} onPlantSubmit={handlePlantSubmit} onFormChange={handleFormChange}/>
      <Search search={search} onSearch={handleSearch}/>
      <PlantList plants={displayPlants} onDeletePlant={handleDeletePlant} onUpdatePlant={handleUpdatePlant}/>
    </main>
  );
}

export default PlantPage;
