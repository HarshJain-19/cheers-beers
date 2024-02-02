import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ImgCard from './ImgCard'
import Empty from './Empty'

const BeerCollection = (props) => {

    const [beerCollect, setBeerCollect] = useState([]);
    const link = 'https://api.punkapi.com/v2/beers';

    const getData = async () => {
        await axios
          .get(link+ (props.fav ?  '/?ids=' + props.favourites.join('|') : ''))
          .then(res => res.data)
          .then(data => {
            console.log(data);
            setBeerCollect(data);
          })
          .catch(err => window.alert("Something Gone Wrong...\npage refresh the page or try again later\n and error: "+err));
        console.log(props.favourites.join('|'));
    };
    useEffect(() => {
        getData();
    }, [props.fav]);

  return (
    <div className='main'>
      {beerCollect.length ? beerCollect.map((e,i) => <ImgCard key={i} cardData = {{id: e.id, imgurl: e.image_url, name: e.name, desc: e.description}} changeId={props.changeId} changeFavourites={props.changeFavourites} favourites={props.favourites} />) : <Empty />}
    </div>
  )
}

export default BeerCollection
