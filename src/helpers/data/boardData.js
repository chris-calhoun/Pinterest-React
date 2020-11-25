import axios from 'axios';

const baseUrl = 'https://pinterest-aa40e.firebaseio.com/';

const getAllBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/board.json`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/board/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export { getAllBoards, getSingleBoard };
