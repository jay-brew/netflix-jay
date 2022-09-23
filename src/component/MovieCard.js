import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {FaStar, FaRegThumbsUp } from 'react-icons/fa'

const MovieCard = ({item,path}) => {
  const {genreList} = useSelector((store)=>store.movie);
  const navigate = useNavigate();
  
  let firstPath = 'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces';
  let imgPath = item.poster_path;
  let cardClass = '';

  if(path==="movieDetail"){
    imgPath=item.backdrop_path;
    firstPath='https://www.themoviedb.org/t/p/w250_and_h141_face';
    cardClass='detailCard';
  }
  if(path==="movies"){
    cardClass='moviesCard';
  }

  const moveDetailPage = (item) => {
    navigate("/movies/"+item.id, {state:{item:item}});
  };

  return (
    <div className={`card ${cardClass}`}
      style={{
        backgroundImage:"url("+`${firstPath+imgPath}`+")",
      }}
      onClick={() => moveDetailPage(item)}
    >
      <div className='overlay'>
        <h3 style={{marginTop:"10px"}}>{item.title}</h3>
        <div>
          <h5>
            {item.genre_ids.map((id, index)=>(
              <Badge bg="danger" key={index}>
                {genreList.find((item)=>item.id===id).name}
              </Badge>
            ))}
          </h5>
        </div>
        <div>
          <h5>
            <span style={{marginRight:"10px"}}>
              <FaStar /> {item.vote_average}
            </span>
            <span style={{marginRight:"10px"}}>
              <FaRegThumbsUp /> {Math.floor(item.popularity)}
            </span>
            <span style={{fontWeight:'bold'}}>
              {item.adult ? <a style={{color:'red'}}>청불</a> : <a style={{color:'red'}}>Under_18</a>}
            </span>
          </h5>
        </div>
      </div>
    </div>
  )
}

export default MovieCard


