import React from "react";
import { PokemonContainer } from "./components/PokemonContainer/PokemonContainer";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <PokemonContainer />
      </ErrorBoundary>
    </>
  );
};

export default App;
