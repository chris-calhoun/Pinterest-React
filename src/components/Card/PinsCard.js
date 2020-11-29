import React, { Component } from 'react';
import PinForm from '../Forms/PinForm';
import AppModal from '../Modal/index';
import PinData from '../../helpers/data/pinData';

export default class PinsCard extends Component {
  state = {
    pin: {},
  };

  getPinInfo = (pinId) => {
    PinData.getPin(pinId).then((response) => {
      this.setState({
        pin: response,
      });
    });
  }

  render() {
    const {
      pin,
      onDelete,
    } = this.props;
    return (
      <div className='pin-card card m-2'>
      <img className='card-img-top' src={pin.imageUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{pin.name}</h5>
        <p className='card-text'>{pin.description}</p>
        <AppModal title={'Edit Pin'} buttonLabel={'Edit Pin'}>
          {Object.keys(pin).length && <PinForm pin={pin} onUpdate={this.getPinInfo}/>}
        </AppModal>
        <button id={pin.firebaseKey} onClick={onDelete} className='btn btn-danger'>Delete</button>
      </div>
    </div>
    );
  }
}
