import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { movieAction } from '../redux/actions/movieAction';

const Banner = ({movie}) => {
  const dispatch = useDispatch();
  const {movieTrailer} = useSelector(state=>state.movie);
  const [movieTrailerApi, setMovieTrailer] = useState("");
  
  useEffect(() => {
    dispatch(movieAction.movieTrailer(movie));
    setMovieTrailerFunction();
  },[])
  const setMovieTrailerFunction = () => {
    setMovieTrailer(movieTrailer)
  }

  class Example extends React.Component {
    render() {
      const opts = {
        height: '600',
        width: '100%',
        playerVars: {
          autoplay: 1, //자동재생 O
          rel: 0, //관련 동영상 표시하지 않음
          modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
          controls:0,
          disablekb:1,
          fs:0,
          // cc_load_policy:1,  // 자막
          // cc_lang_pref:'ko'  // 자막언어?
        },
      };
  
      return <YouTube videoId={movieTrailerApi} opts={opts}  />;
    }
  
    // _onReady(event) {
    //   event.target.pauseVideo();
    // }

    _onEnd(event) {
      event.target.stopVideo(0);
    }

  };

  return (
    <div>
      <div className='bannerVedio'>
        <Example />
      </div>
      <div className='banner-info'>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  )
}

export default Banner;
