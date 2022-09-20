import React, { useEffect, useState } from 'react'
import {Badge} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation} from 'react-router-dom';
import MovieCard from '../component/MovieCard';
import api from '../redux/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';

const API_KEY=process.env.REACT_APP_API_KEY;
const MovieDetail = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const item = location.state.item;
  const {genreList} = useSelector((store)=>store.movie);
  const [movieApiData, setMovieApiData] = useState("");
  const [genreListApi, setGenreListApi] = useState("");
  const [reviewApi, setReviewApi] = useState("");
  const [realtedApi, setRealtedApi] = useState("");
  const [movieVedioApi, setMovieVedioApi] = useState("");
  const [reviewDiv, setReviewDiv] = useState("Review");
  class Example extends React.Component {
    render() {
      const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
      };
  
      return <YouTube videoId={movieVedioApi} opts={opts}  />;
    }
  
    _onReady(event) {
      event.target.pauseVideo();
    }
  };

  const getMovieApi = async() => {
    const getMovieApi = api.get(`/movie/${item.id}?api_key=${API_KEY}&language=en-US`);
    const getGenreListApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const getReviewApi = api.get(`/movie/${item.id}/reviews?api_key=${API_KEY}&language=en-US`);
    const getRealtedApi = api.get(`/movie/${item.id}/recommendations?api_key=${API_KEY}&language=en-US`);
    const getMovieVedioApi = api.get(`/movie/${item.id}/videos?api_key=${API_KEY}&language=en-US`);

    let [movieApi, genreApi, reviewApi, realtedApi, movieVedioApi] = await Promise.all([getMovieApi, getGenreListApi, getReviewApi, getRealtedApi, getMovieVedioApi]);
    setMovieApiData(movieApi.data);
    setGenreListApi(genreApi.data.genres);
    setReviewApi(reviewApi.data.results);
    setRealtedApi(realtedApi.data.results);
    setMovieVedioApi(movieVedioApi.data.results[0].key);
  };

  const reViewDivShowHide = (clickValue) => {
    setReviewDiv(clickValue);
  };

  useEffect(()=>{
    getMovieApi();
  },[])

  return (
    <div>
      <div 
        className='banner' 
        style={{
        backgroundImage:"url("+`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${location.state.item.poster_path}`+")",
        }}
      >
        <div className='main_movieDetail'>
          <div 
            className='movieDetail_card' 
            style={{
            backgroundImage:"url("+`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${location.state.item.poster_path}`+")",
            }}
          >
          </div>
          <div className='movieDetail_info'>
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
              <div><span>평점{item.vote_average}</span>     <span>연령{item.adult ? "청불" : "Under 18"}</span></div>
              <hr />
              <div>{item.overview}</div>
              <hr />
              <div>
                <div><Badge bg="danger" style={{width:"100px", marginRight:"10px"}}>budget</Badge>${movieApiData.budget}</div>
                <div><Badge bg="danger" style={{width:"100px", marginRight:"10px"}}>revenue</Badge>{movieApiData.revenue}</div>
                <div><Badge bg="danger" style={{width:"100px", marginRight:"10px"}}>release_date</Badge>{movieApiData.release_date}</div>
                <div><Badge bg="danger" style={{width:"100px", marginRight:"10px"}}>runtime</Badge>{movieApiData.runtime}</div>
              </div>
          </div>
        </div>
      </div>
      <div className='movieDetail_review'>
        <div><h2><a style={{border:"2px solid red", marginRight:"10px", cursor:"pointer"}} onClick={(e)=>reViewDivShowHide(e.target.text.slice(0,6))}>Review({reviewApi&&reviewApi.length+')'}</a><a style={{border:"2px solid red", cursor:"pointer"}} onClick={(e)=>reViewDivShowHide(e.target.text)}>RELATED MOVIES</a></h2></div>
        {reviewDiv === 'Review' ? 
          <div className='reviewBox'>
            {reviewApi&&reviewApi.map((item, index) => (
              <div key={index}>
                <div>{reviewApi[index]["author"]}</div>
                <div>{reviewApi[index]["content"]}</div>
                <hr/>
              </div>
            ))}
          </div> 
          :
          <div>
            <div className='realtedMovieBox'>
                {!realtedApi ? realtedApi.map((item, index) => (
                  <div>
                    <MovieCard item={item}/>
                  </div>
                )) : <h3>추천영화가 없습니다.</h3> }
            </div>
          </div>
        }
      </div>
      <>
        <Button variant="primary" onClick={handleShow}>
          영화 예고편 보기
        </Button>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Body>
            <Example />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  )
}

export default MovieDetail