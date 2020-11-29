import React, { Component } from 'react';
import getUid from '../../helpers/data/authData';
import BoardData from '../../helpers/data/boardData';
import BoardPinData from '../../helpers/data/boardPinData';

export default class PinToBoardForm extends Component {
  state = {
    boards: [],
    selected: '',
  }

  componentDidMount() {
    const userId = getUid();
    BoardData.getAllUserBoards(userId).then((response) => {
      this.setState({
        boards: response,
        selected: response[0].firebaseKey,
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      selected: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const pinToBoard = {
      boardId: this.state.selected,
      pinId: this.props.pinId,
      userId: getUid(),
    };
    BoardPinData.pinToBoardJoin(pinToBoard);
  }

  loadBoardsDropdown = () => (
    this.state.boards.map((board) => (<option key={board.firebaseKey} value={board.firebaseKey }>{board.name}</option>))
  );

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Select board</label>
        <select value={this.state.selected} onChange={this.handleChange}>{this.loadBoardsDropdown()}</select>
        <button type='submit'>Submit</button>
      </form>
    );
  }
}
