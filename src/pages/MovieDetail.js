import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation} from 'react-router-dom';
import api from '../redux/api';

const API_KEY=process.env.REACT_APP_API_KEY;
const MovieDetail = () => {
  const location = useLocation();
  const item = location.state.item;
  const {genreList} = useSelector((store)=>store.movie);
  const [movieApiData, setMovieApiData] = useState("");
  const [genreListApi, setGenreListApi] = useState("");

  const getMovieApi = async() => {
    const getMovieApi = api.get(`/movie/${item.id}?api_key=${API_KEY}&language=en-US`);
    const getGenreListApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    let [movieApi, genreApi] = await Promise.all([getMovieApi, getGenreListApi]);

    
    setMovieApiData(movieApi.data);
    setGenreListApi(genreApi.data.genres);
  };

  useEffect(()=>{
    getMovieApi()
  },[])

  return (
    <div>
      <div 
        className='card' 
        style={{
        backgroundImage:"url("+`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${location.state.item.poster_path}`+")",
        }}
      >
      </div>
      <div>
      <div>
            <div>
              {item.genre_ids.map((id, index)=>(
                <Badge bg="danger" key={index}>
                  {genreListApi &&  genreListApi.find((item)=>item.id===id).name}
                </Badge>
              ))}
            </div>
            <h1>{item.title}</h1>
            <div>
              {item.name}
            </div>
            <div><span>{item.vote_average}</span><span>{item.adult ? "청불" : "Under 18"}</span></div>
            <div>{item.overview}</div>
            <div>${movieApiData.budget}</div>
            <div>{movieApiData.revenue}</div>
            <div>{movieApiData.release_date}</div>
            <div>{movieApiData.runtime}</div>
          </div>
      </div>
    </div>

  )
}

export default MovieDetail