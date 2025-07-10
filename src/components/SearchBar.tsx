import { Component } from "react";
import React, { ChangeEvent } from "react";

type Props = {};

type State = {
  inputValue: string;
};

export class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  componentDidMount() {}

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearch = () => {};

  render() {
    return (
      <div>
        <input
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}
