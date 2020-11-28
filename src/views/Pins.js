import React from 'react';
import getUid from '../helpers/data/authData';
import PinData from '../helpers/data/pinData';
import PinsCard from '../components/cards/PinsCard';
import AppModal from '../components/Modal/index';
import PinForm from '../components/Forms/PinForm';

export default class Pins extends Component {
  state = {
    pins: [],
    loading: true,
  }

componentDidMount() {
  this.getPins();
}

getPins = () => {
  const currentUserId = getUid();
  PinData.getAllUserPins(currentUserId).then((response) => {
    this.setState({ 
      pins: response
    }, this.setLoading);
  });
}

setLoading = () => {
  this.timer = setInterval(() => {
    this.setState({ loading: false });
  }, 1000);
}

componentWillUnmount() {
  clearInterval(this.timer);
}

  render() {
    const { pins, loading } = this.state;
    const showPins = () => (
      pins.map((pin) => <PinsCard key={pin.firebaseKey} pin={pin}/>)
    );
    return (
      <>

      {loading ? (
        <Loader />
      ) : (
        <>
        <AppModal title={'Create Pin'} buttonLabel={'CreateBoard'}>
          <PinForm onUpdate={this.getPins}/>
        </AppModal>
        <h1>Here are all of your pins</h1>
        <div className='d-flex flex-wrap container'>{showPins()}</div>
        </>
      )}
      </>
    );
  }
}

