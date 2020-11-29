import axios from 'axios';

const baseUrl = 'https://pinterest-aa40e.firebaseio.com';

const pinToBoardJoin = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins-boards.json`, object)
    .then((response) => {
      (resolve(response.data));
    }).catch((error) => reject(error));
});

const deletePinBoards = (pinId) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="pinId"&equalTo="${pinId}"`)
    .then((response) => {
      console.warn('response', response.data);
      const pinBoardKeys = Object.keys(response.data);
      console.warn('pbkey', pinBoardKeys);
      pinBoardKeys.forEach((pinBoardFBKey) => {
        axios.delete(`${baseUrl}/pins-boards/${pinBoardFBKey}.json`);
      });
    });
};

// eslint-disable-next-line
export default { pinToBoardJoin, deletePinBoards };
