import React, {useEffect, useState} from 'react'
import { movieAction } from '../redux/actions/movieAction';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../component/Banner';
import MovieSlide from '../component/MovieSlide';
import ClipLoader from "react-spinners/ClipLoader";
import Footer from '../component/Footer';

const Home = () => {
  const dispatch = useDispatch();
  const {popularMovies, topRatedMovies, upcomingMovies, loading} = useSelector(state=>state.movie);
  
  console.log(popularMovies)

  useEffect(()=>{
    if(popularMovies!==undefined){
      dispatch(movieAction.getMovies());
    }
  },[]);

  if(loading){
    return <ClipLoader color="#ffff" loading={loading} size={150} />
  }

  return (
    <div>
      <Banner movie={popularMovies&&popularMovies.results[2]}></Banner>
      <h1 style={{marginLeft:"35px"}}>Popular Movies</h1>
      <MovieSlide movies={popularMovies&&popularMovies}/>
      <h1 style={{marginLeft:"35px"}}>TopRated Movies</h1>
      <MovieSlide movies={topRatedMovies&&topRatedMovies} />
      <h1 style={{marginLeft:"35px"}}>Upcoming Movies</h1>
      <MovieSlide movies={upcomingMovies&&upcomingMovies} />
      <Footer />
    </div>
  )
}



export default Home