import React, { Component } from 'react';
import solver from './solver.js';

class BoggleSolver extends Component {

  constructor(...props) {
    super(...props);
    this.state = this.defaultState;
    this.updateRow = this.updateRow.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  defaultState = {
    rowOne: '',
    rowTwo: '',
    rowThree: '',
    rowFour: ''
  }

  updateRow(event) {
    let row = event.target.name;
    let value = event.target.value;

    this.setState({
      [row]: value
    })

  }

  handleError() {
    document.querySelector("#words").innerHTML = "Input should only contain letters a - z";
  }

  inputError(boardStrings) {
    return (/[^a-zA-Z]/).test(boardStrings.join(""));
  }

  createBoard(boardStrings) {
    return boardStrings.map(string => string.toLowerCase().split(""));
  }

  handleSubmit(event) {
    event.preventDefault();
    let boardStrings = [
      this.state.rowOne,
      this.state.rowTwo,
      this.state.rowThree,
      this.state.rowFour
    ]

    if (this.inputError(boardStrings)) {
      this.handleError();
    } else {
      let board = this.createBoard(boardStrings);
      let words = solver.findAllWords(board);
      let result = words.length === 0 ? "No words can be formed from this input" : words.join(", ");
      document.querySelector("#words").innerHTML = result;
    }
  }

  handleReset(event) {
    event.preventDefault();

    this.setState(this.defaultState);
    document.querySelector("#words").innerHTML = "";
  }

  render() {
    return (
      <div id="boggle-solver">
        <h1>Boggle Solver</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="rowOne">Row One:</label>
          <input
            name="rowOne"
            size="4"
            maxLength="4"
            minLength="4"
            value={this.state.rowOne}
            onChange={this.updateRow}>
          </input>

          <label htmlFor="rowTwo">Row Two:</label>
          <input
            name="rowTwo"
            size="4"
            maxLength="4"
            minLength="4"
            value={this.state.rowTwo}
            onChange={this.updateRow}>
          </input>

          <label htmlFor="rowThree">Row Three:</label>
          <input
            name="rowThree"
            size="4"
            maxLength="4"
            minLength="4"
            value={this.state.rowThree}
            onChange={this.updateRow}>
          </input>

          <label htmlFor="rowFour">Row Four:</label>
          <input
            name="rowFour"
            size="4"
            maxLength="4"
            minLength="4"
            value={this.state.rowFour}
            onChange={this.updateRow}>
          </input>

          <button type="submit">Submit</button>
          <button onClick={this.handleReset}>Reset Form</button>
        </form>

        <div name="result">
          <h2>Words that can be created from this board:</h2>
          <p id="words"></p>
        </div>
      </div>
    )

  }
}

export default BoggleSolver;
