import React from 'react';
import PinData from '../helpers/data/pinData';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/Modal';

export default class PinDetails extends React.Component {
  state = {
    pin: {},
  };

  componentDidMount() {
    // 1. pull pinId from URL params
    const pinId = this.props.match.params.id;
    // 2. make a call to the API that gets the board info
    this.getPin(pinId);
  }

  getPin = (pinId) => {
    PinData.getPin(pinId).then((response) => {
      this.setState({
        pin: response,
      });
    });
  }

  render() {
    const { pin } = this.state;

    return (
      <div>
        <AppModal title={'Edit Pin'} buttonLabel={'Edit Pin'}>
          {Object.keys(pin).length && <PinForm pin={pin} onUpdate={this.getPin}/>}
        </AppModal>
        <h1>{pin.name}</h1>
        <img src={pin.imageUrl} alt={pin.name}></img>
        <h3>{pin.description}</h3>
      </div>
    );
  }
}
