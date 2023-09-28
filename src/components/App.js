import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])
  const [formData, setformData] = useState({
    name: "",
    image: "",
    likes: 2
  })

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(res => res.json())
    .then(data=> setToys(data))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleChange(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch("http://localhost:3001/toys", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        setToys([...toys, data]); // update the toys state with the new toy
      })
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    });
    const updatedToys = toys.filter(toy => toy.id !== id);
    setToys(updatedToys);
  };
 
  function handleUpdate(id, like) {
    const updated = {
      likes :like + 1
    }
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ updated })
  })
      .then(r => r.json())
      .then(() => {
        const updatedLikes = [...toys].map(li => li.id === id ? { ...li, ...updated }  : li)
        setToys(updatedLikes)
      })
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleChange={handleChange} handleSubmit={handleSubmit} formData={formData}  /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
    </>
  );
}

export default App;
