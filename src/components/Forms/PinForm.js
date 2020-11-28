import React, { Component } from 'react'
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import { createPin, updatePin } from '../../helpers/data/pinData';

export default class PinForm extends Component {
  state = {
    firebaseKey:this.props.pin?.firebaseKey || '',
    name: this.props.pins?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    userId: this.props.board?.userId || '',
    description: this.props.pin?.description || '',
  }

  componentDidMount() {
    const userId = getUser();
    this.setState({
      userId,
    });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });

      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${this.state.userId}/${Date.now()}${e.target.files[0].name}`);

      console.warn(e.target.files[0]);

      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.firebaseKey === '') {
      PinData.createBoard(this.state).then(() => {
        // rerender/update state in the pins components
        this.props.onUpdate();
      });
    } else {
      PinData.updatePin(this.state).then(() => {
        // rerender/update state in the pins components
        this.props.onUpdate(this.props.pin.firebaseKey);
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Pin Form</h1>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='Pin Name'
          className='form-control form-control-lg m-1'
          required
          />
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          placeholder='Pin Description'
          className='form-control form-control-lg m-1'
          required
          />
        <input
          type='url'
          name='imageUrl'
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder='Enter an Image URL or Upload a File'
          className='form-control form-control-lg m-1'
          required
          />
        <input
          className='m-2'
          type='file'
          id='myFile'
          name='filename'
          accept='image/*'
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    )
  }
}
