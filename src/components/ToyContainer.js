import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, handleDelete, handleUpdate }) {
  console.log(toys)
  return (
    <div id="toy-collection">{toys.map(toy => <ToyCard toy={toy} key={toy.id} handleDelete={handleDelete} handleUpdate={handleUpdate} />) }</div>
  );
}

export default ToyContainer;
