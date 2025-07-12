import React from "react";
import Button from "../button/Button";

export default function ErrorBoundaryButton() {
  const throwError = () => {
    throw new Error("ErrorBoundary check");
  };
  return (
    <Button onClick={throwError} className="errorButton">
      ErrorBoundary
    </Button>
  );
}
