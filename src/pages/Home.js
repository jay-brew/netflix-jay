import React, {useEffect, useState} from 'react'
import { movieAction } from '../redux/actions/movieAction';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../component/Banner';
import MovieSlide from '../component/MovieSlide';
import ClipLoader from "react-spinners/ClipLoader";
import Footer from '../component/Footer';

const Home = () => {
  const [movieVedioApi, setMovieVedioApi] = useState("");
  const dispatch = useDispatch();
  const {popularMovies, topRatedMovies, upcomingMovies, loading} = useSelector(state=>state.movie);
  
  useEffect(()=>{
    dispatch(movieAction.getMovies());
    setMovieVedioApi('')
  },[]);

  if(loading){
    return <ClipLoader color="#ffff" loading={loading} size={150} />
  }

  return (
    <div>
      {/* Banner 와 MovieSlide 컴포넌트를 사용, 그리고 movie 와 movies라는 props를 생성*/}
      <Banner movie={popularMovies.results[1]}/>
      <h1 style={{marginLeft:"35px"}}>Popular Movies</h1>
      <MovieSlide movies={popularMovies}/>
      <h1 style={{marginLeft:"35px"}}>TopRated Movies</h1>
      <MovieSlide movies={topRatedMovies} />
      <h1 style={{marginLeft:"35px"}}>Upcoming Movies</h1>
      <MovieSlide movies={upcomingMovies} />
      <Footer />
    </div>
  )
}

export default Home