import React from 'react';
import { Link } from 'react-router-dom';
import AppModal from '../Modal/index';
import PinToBoardForm from '../Forms/PinToBoardForm';

export default function PinsCard({ pin, onDelete }) {
  return (
    <div className='pin-card card m-2'>
      <img className='card-img-top' src={pin.imageUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{pin.name}</h5>
        <p className='card-text'>{pin.description}</p>
        <Link className='btn btn-primary' to={`/pin-details/${pin.firebaseKey}`}>
          Pin Details
        </Link>
        <AppModal title={'Add Pin to Board'} buttonLabel={'Add to Board'}><PinToBoardForm pinId={pin.firebaseKey} /></AppModal>
      </div>
    </div>
  );
}
