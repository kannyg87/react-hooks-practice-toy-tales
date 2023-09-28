import React from "react";

function ToyCard({toy, handleDelete, handleUpdate}) {
  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={()=>handleUpdate(toy.id, toy.likes)}>Like {toy.likes}</button>
      <button className="del-btn" onClick={()=>handleDelete(toy.id)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
