import React from "react";
import Row from "./Row";

const Grid = ({ currentGuess, turn, guesses }) => {
  return (
    <> 
      {guesses.map((g, i) => (
        <Row key={i} guess={g} />
      ))}
    </>
  );
};

export default Grid;
