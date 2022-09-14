import React, {useEffect} from 'react'
import { movieAction } from '../redux/actions/movieAction';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../component/Banner';

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
    </div>
  )
}

export default Home