import React from "react";

interface Card {
  id: number;
  name: string;
  email: string;
}

const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <div className="cookie-card">
      <div className="flex gap-1">
        <span className="mt-[0.8rem] description">Id :</span>
        <p className="description">{card.id}</p>
      </div>
      <span className="title">{card.name}</span>
      <p className="description">{card.email}</p>
      {/* <div className="actions">
        <button className="accept">Delete User</button>
      </div> */}
    </div>
  );
};

export default CardComponent;
