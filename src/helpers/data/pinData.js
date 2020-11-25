import axios from 'axios';

const baseUrl = 'https://pinterest-aa40e.firebaseio.com/';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pin/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

export { getBoardPins, getPin };
