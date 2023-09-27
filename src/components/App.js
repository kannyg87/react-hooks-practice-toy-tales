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
    likes: ""
  })

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(res => res.json())
    .then(data=> setToys(data))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleChange(value) {
    setformData(value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log("submited")
    
  }
  console.log(formData)

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;
