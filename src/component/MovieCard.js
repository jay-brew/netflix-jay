import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const MovieCard = ({item}) => {
  const {genreList} = useSelector((store)=>store.movie);

  console.log("genreList : ", genreList);
  return (
    <div className='card' style={{
            backgroundImage:"url("+`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}`+")"
        }}>
          <div className='overlay'>
            <h1>{item.title}</h1>
            <div>
              {item.genre_ids.map((id, index)=>(
                <Badge bg="danger" key={index}>
                  {genreList.find((item)=>item.id===id).name}
                </Badge>
              ))}
            </div>
            <div><span>{item.vote_average}</span><span>{item.adult ? "청불" : "Under 18"}</span></div>
          </div>
    </div>
  )
}

export default MovieCard


