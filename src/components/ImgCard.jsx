import React from 'react';
import { red } from '@mui/material/colors';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ImgCard(props) {
  const navigate = useNavigate(); 
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const checkDetails = () => {
    props.changeId(props.cardData.id);
    console.log('changed');
    return navigate('/details');
  }
  const changeFavList= () => {
    if (props.favorites.indexOf(props.cardData.id.toString())===-1) 
      props.changeFavourites([...props.favorites,props.cardData.id.toString()]);
    else 
      props.changeFavourites(props.favorites.filter(e => e!==props.cardData.id.toString()));
  }
  return (
    <Card style={{ width: '20rem' }} className='m-4 img-card' title={props.cardData.id}>
      <a href={props.cardData.imgurl} className='card-img'>
        <Card.Img variant="top" src={props.cardData.imgurl} className='card-img' />
      </a>
      <div className="fav-body">
        <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{color: red[800],'&.Mui-checked': {color: red[600],},}} absolute='true' onClick={changeFavList} checked={props.favorites.indexOf(props.cardData.id.toString())!==-1}
        />
      </div>
      <Card.Body className=''>
        <Card.Title>{props.cardData.name}</Card.Title>
        <Card.Text style={{height: '100px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
          {props.cardData.desc}
        </Card.Text>
        <Button variant="primary" onClick={checkDetails}>Detail...</Button>
      </Card.Body>
    </Card>
  );
}

export default ImgCard;