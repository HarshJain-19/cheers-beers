import React, { useEffect, useState  } from 'react';
import '../styles/details.css'
import axios from 'axios';  
import Empty from './Empty';

const Detail = (props) => {

    const [beerData, setBeerData] = useState({});
    const [ingre, setIngre] = useState({});
    const link = 'https://api.punkapi.com/v2/beers';

    const getData = async () => {
        const res = await axios.get(link+'/?ids='+props.id);
        console.log(res);
        const data = await res.data;
        setBeerData(data[0]);
        let malt = data[0].ingredients.malt.map(e => e.name).join(', ');
        let hops = data[0].ingredients.hops.map(e => e.name).join(', ');
        let yeasts = data[0].ingredients.yeasts;
        setIngre({malt,hops,yeasts});
    };
    useEffect(() => {
        getData();
    }, []);

  return (
    Object.keys(beerData).length ? 
    <>
    <div className='detail-box'>
      <div className='part-one'>
        <a href={beerData.image_url} className='my-4'>
            <img src={beerData.image_url} alt="" />
        </a>
      </div>
      <div className="part-two">
        <div className="detail-item">
            <span className='q'>Name :</span> {beerData.name}
        </div>
        <div className="detail-item">
            <span className='q'>Tagline :</span> {beerData.tagline}
        </div>
        <div className="detail-item">
            <span className='q'>description :</span>  {beerData.description}
        </div>
        <div className="detail-item">
            <span className='q'>first brewed :</span> {beerData.first_brewed}
        </div>
        <div className="detail-item" title='alcohol by volume'>
            <span className='q'>abv :</span> {beerData.abv}
        </div>
        <div className="detail-item" title='International Bitterness Unit'>
            <span className='q'>ibu: </span> {beerData.ibu}
        </div>
        <div className="detail-item">
            <span className='q'>ph :</span> {beerData.ph}
        </div>
        <div className="detail-item">
            <span className='q'>ingredients :</span> malt ({ingre.malt}), hops ({ingre.hops}), yeasts ({ingre.yeasts})
        </div>
        <div className="detail-item">
            <span className='q'>brewers tips: </span> {beerData.brewers_tips}
        </div>
        <div className="detail-item">
            <span className='q'>contributed_by :</span> {beerData.contributed_by}
        </div>

      </div>
    </div>
    </> : <Empty />
  )
}

export default Detail
