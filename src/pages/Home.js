import React, {useEffect} from 'react'
import { movieAction } from '../redux/actions/movieAction';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../component/Banner';
import MovieSlide from '../component/MovieSlide';

const Home = () => {
  const dispatch = useDispatch();
  const {popularMovies, topRatedMovies, upcomingMovies} = useSelector(state=>state.movie);
  console.log("home : ", popularMovies)

  useEffect(()=>{
    dispatch(movieAction.getMovies());
  },[]);

  return (
    <div>
      {popularMovies.results && <Banner movie={popularMovies.results[3]}/>}
      <h1>Popular Movies</h1>
      <MovieSlide movies={popularMovies} />
      <h1>TopRated Movies</h1>
      <MovieSlide movies={topRatedMovies} />
      <h1>Upcoming Movies</h1>
      <MovieSlide movies={upcomingMovies} />
    </div>
  )
}

export default Home