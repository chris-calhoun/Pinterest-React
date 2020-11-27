import React from 'react';
import BoardData from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardsCard';
import Loader from '../components/Loader';
import BoardsForm from '../components/Forms/BoardForm';
import getUid from '../helpers/data/authData';
import AppModal from '../components/Modal/index';

export default class Boards extends React.Component {
  state = {
    boards: [],
    loading: true,
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const currentUserId = getUid();
    // console.warn(currentUserId);
    BoardData.getAllUserBoards(currentUserId).then((response) => {
      this.setState({
        boards: response,
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

  deleteBoard = (e) => {
    BoardData.deleteBoard(e.target.id);
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => (
      boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} onDelete={this.deleteBoard}/>)
    );
    return (
      <>

        {loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Create Board'} buttonLabel={'CreateBoard'}>
            <BoardsForm onUpdate={this.getBoards}/>
          </AppModal>
          <h1>Here are all of your boards</h1>
          <div className='d-flex flex-wrap container'>{showBoards()}</div>
          </>
        )}
      </>
    );
  }
}
