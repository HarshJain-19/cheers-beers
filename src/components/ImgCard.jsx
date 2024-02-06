import React, { useState } from 'react';
import { red } from '@mui/material/colors';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; 
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from 'react-router-dom';

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
      props.changeFavorites([...props.favorites,props.cardData.id.toString()]);
    else 
      props.changeFavorites(props.favorites.filter(e => e!==props.cardData.id.toString()));
  }
  return (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id="button-tooltip-2" style={{zIndex: '0'}}>{props.cardData.id}</Tooltip>}
    > {({ ref, ...triggerHandler }) => (
      <div>
      <Card style={{ width: '20rem' }} className='m-4 img-card' {...triggerHandler}>
      <div>
        <a href={props.cardData.imgurl} className='card-img' ref={ref}>
          <Card.Img variant="top" src={props.cardData.imgurl} className='card-img'/>
        </a>
        <div className="fav-body" title='Like'>
          <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{color: red[800],'&.Mui-checked': {color: red[600],},}} absolute='true' onClick={changeFavList} checked={props.favorites.indexOf(props.cardData.id.toString())!==-1}
          />
        </div>
        <Card.Body style={{textAlign: 'center', marginTop: '0.2rem'}}>
          <Card.Title style={{fontWeight: '600', textTransform: 'capitalize', fontVariant: 'small-caps', textDecoration: 'underline solid'}}>{props.cardData.name}</Card.Title>
          <Card.Text style={{height: '100px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            {props.cardData.desc}
          </Card.Text>
          <Button variant="outline-primary" onClick={checkDetails}>Detail...</Button>
        </Card.Body>
        </div>
      </Card>
      </div>
    )}
    </OverlayTrigger>
  );
}

export default ImgCard;