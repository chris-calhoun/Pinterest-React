import React from 'react';
import PinData from '../helpers/data/pinData';
import BoardData from '../helpers/data/boardData';
import PinsCard from '../components/Card/PinsCard';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/Modal';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    // 1. pull boardId from URL params
    const boardId = this.props.match.params.id;
    // 2. make a call to the API that gets the board info
    this.getBoardInfo(boardId);

    // 1. Make a call to the API that returns the pins associated with this board and set to state.
    this.getPins(boardId)
      .then((resp) => {
        // console.warn(boardId);
        // console.warn(resp);
        this.setState({ pins: resp });
      });
  }

  getBoardInfo = (boardId) => {
    BoardData.getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });
  }

  getPins = (boardId) => (
    PinData.getBoardPins(boardId).then((response) => {
      // an array that holds all of the calls to get the pin information
      const pinArray = [];
      response.forEach((item) => {
        // pushing a function that returns a promise into the pinArray
        pinArray.push(PinData.getPin(item.pinId));
      });
      // returning an array of all the fullfilled promises
      return Promise.all(pinArray);
    })
  )

  // deletePin = (e) => {
  //   PinData.deletePin(e.target.id);
  //   const remainingPins = this.state.pins.filter((pin) => pin.firebaseKey !== e.target.id);
  //   this.setState({
  //     pins: remainingPins,
  //   });
  // }

  render() {
    const { pins, board } = this.state;
    const renderPins = () => (
      pins.map((pin) => (
         <PinsCard key={pin.firebaseKey} pin={pin} />
      ))
    );

    // 3. Render the pins on the DOM
    return (
      <div>
        <AppModal title={'Update Board'} buttonLabel={'Update Board'}>
          {Object.keys(board).length && <BoardForm board={board} onUpdate={this.getBoardInfo}/>}
        </AppModal>
        <h1>{board.name}</h1>
        <div className='d-flex flex-wrap container'>
          {renderPins()}
        </div>
      </div>
    );
  }
}
