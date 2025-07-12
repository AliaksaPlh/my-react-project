import React from "react";
import { Component } from "react";
import type { ChangeEvent } from "react";
import Button from "./button/Button";
import Input from "./input/Input";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export function SearchBar(props: Props) {
  const { value, onChange, onSearch } = props;
  return (
    <div style={{ marginBottom: "20px" }}>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Enter FULL! Pokémon name..."
        style={{ width: "250px" }}
      />
      <Button onClick={onSearch} className="regularButton">
        Search
      </Button>
    </div>
  );
}
