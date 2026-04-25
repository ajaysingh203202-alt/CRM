import React from "react";

function Carddash(p) {
  return (
    <>
      <div className="card shadow ps-2  rounded-2 mt-4 mb-4 bg-white">
        <p>{p.title}</p>
        <p className="fw-bolder">{p.num}</p>
        <p>
          {p.overdue} <span className="text-danger">{p.duenum}</span>
        </p>
      </div>
    </>
  );
}

export default Carddash;
