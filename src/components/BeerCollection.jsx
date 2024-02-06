import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ImgCard from "./ImgCard";
import Empty from "./Empty";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from 'react-bootstrap/Spinner';

const BeerCollection = (props) => {
    const [favorites, setFavorites] = useState(
        window.localStorage.getItem("favList")
            ? window.localStorage.getItem("favList").split(",")
            : []
    );
    const changeFavorites = (x) => setFavorites(x);

    useEffect(() => {
        window.localStorage.setItem("favList", favorites.join(","));
        console.log(favorites);
    }, [favorites]);

    const [page, setPage] = useState(1);

    const [beerCollect, setBeerCollect] = useState([]);
    const link = "https://api.punkapi.com/v2/beers";

    const getData = async () => {
        await axios
            .get(
                props.searching 
                    ? (link + "?beer_name=" + props.searched)
                    : (props.fav
                        ? link + "?ids=" + favorites.join("|")
                        : link + `?page=1&per_page=25`)
            )
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                setBeerCollect(data);
            })
            .catch((err) =>
                window.alert(
                    "Something Gone Wrong...\npage refresh the page or try again later\n and error: " +
                        err
                )
            );
        console.log(favorites.join("|"));
        setPage(2);
    };
    useEffect(() => {
        getData();
    }, [props.fav, props.searched]);

    const loader = (
      <div key={0} style={{width: '100%', display: 'grid', justifyItems: 'center', margin: '1rem auto'}}>
        <Spinner animation="border" variant="primary" />
      </div>
    );

    const fetchMore = async () => {
        !props.fav && !props.searching && await axios
            .get(link + `?page=${page}&per_page=25`)
            .then((res) => res.data)
            .then((newData) => {
                console.log(newData);
                setBeerCollect([...beerCollect, ...newData]);
                setPage(page + 1);
            })
            .catch((err) =>
                window.alert(
                    "Something Gone Wrong...\npage refresh the page or try again later\n and error: " +
                        err
                )
            );
        console.log(favorites.join("|"));
    };

    const showCards = useMemo(() => {
        return beerCollect.length ? (
            beerCollect.map((e, i) => (
                <ImgCard
                    key={i}
                    cardData={{
                        id: e.id,
                        imgurl: e.image_url,
                        name: e.name,
                        desc: e.description,
                    }}
                    changeId={props.changeId}
                    changeFavorites={changeFavorites}
                    favorites={favorites}
                />
            ))
        ) : (
            <Empty />
        );
    }, [beerCollect, favorites, props.fav, props.searched]);

    return (
        <InfiniteScroll
            loadMore={fetchMore}
            hasMore={!props.fav && !props.searching && page <= 13}
            loader={loader}
        >
            <div className="main">{showCards}</div>
        </InfiniteScroll>
    );
};

export default BeerCollection;
