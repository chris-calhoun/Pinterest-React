import React, { Component } from 'react';
import Auth from '../components/Auth';
import Loader from '../components/Loader';
import PinData from '../helpers/data/pinData';
import PinCard from '../components/Card/PinsCard';

export default class Home extends Component {
  state = {
    publicPins: [],
  }

  loadComponent = () => {
    let component = '';
    if (this.props.authed === null) {
      component = <Loader />;
    } else if (this.props.authed) {
      component = this.state.publicPins.map((pin) => (<PinCard key={pin.firebaseKey} pin={pin}/>));
    } else {
      component = <Auth />;
    }
    return component;
  };

  componentDidMount() {
    PinData.getPublicPins().then((response) => {
      this.setState({
        publicPins: response,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome to React-Pinterest</h1>
        <div className='d-flex flex-wrap justify-content-center container'>
          {this.loadComponent()}
        </div>
      </div>
    );
  }
}
