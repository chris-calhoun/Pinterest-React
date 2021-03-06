import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import BoardData from '../../helpers/data/boardData';

export default class BoardForm extends Component {
  state = {
    firebaseKey: this.props.board?.firebaseKey || '',
    name: this.props.board?.name || '',
    imageUrl: this.props.board?.imageUrl || '',
    userId: this.props.board?.userId || '',
    description: this.props.board?.description || '',
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

      // console.warn(e.target.files[0]);

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
      BoardData.createBoard(this.state).then(() => {
        // rerender/update state in the boards components
        this.props.onUpdate();
      });
    } else {
      BoardData.updateBoard(this.state).then(() => {
        // rerender/update state in the boards components
        this.props.onUpdate(this.props.board.firebaseKey);
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Board Form</h1>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='Board Name'
          className='form-control form-control-lg m-1'
          required
          />
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          placeholder='Board Description'
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
    );
  }
}
