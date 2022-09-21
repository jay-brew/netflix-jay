import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({item}) => {
  const {genreList} = useSelector((store)=>store.movie);
  const navigate = useNavigate();

  const moveDetailPage = (item) => {
    navigate("/movies/"+item.id, {state:{item:item}});
  };

  return (
    <div className='card' 
      style={{
        backgroundImage:"url("+`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}`+")",
      }}
      onClick={() => moveDetailPage(item)}
    >
          <div className='overlay'>
            <h2>{item.title}</h2>
            <div>
              {item.genre_ids.map((id, index)=>(
                <Badge bg="danger" key={index}>
                  {genreList.find((item)=>item.id===id).name}
                </Badge>
              ))}
            </div>
            <div style={{marginTop:'10px'}}>
              <span>{item.vote_average}</span>
              <span style={{marginLeft:'10px'}}>{item.adult ? "청불" : "Under 18"}</span>
            </div>
          </div>
    </div>
  )
}

export default MovieCard


