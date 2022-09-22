import React, { useEffect, useState } from 'react'
import {Badge} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation} from 'react-router-dom';
import MovieCard from '../component/MovieCard';
import api from '../redux/api';
import {FaStar, FaRegThumbsUp } from 'react-icons/fa'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import MovieSlide from '../component/MovieSlide';


const API_KEY=process.env.REACT_APP_API_KEY;
const MovieDetail = () => {
  // 모달 - 유튜브 영상 보여주기
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const item = location.state.item;

  const [movieApiData, setMovieApiData] = useState("");
  const [genreListApi, setGenreListApi] = useState("");
  const [reviewApi, setReviewApi] = useState("");
  const [realtedApi, setRealtedApi] = useState("");
  // const [movieVedioApi, setMovieVedioApi] = useState("");
  const [reviewDiv, setReviewDiv] = useState("Review");


  // class Example extends React.Component {
  //   render() {
  //     const opts = {
  //       height: '390',
  //       width: '640',
  //       playerVars: {
  //         autoplay: 1,
  //       },
  //     };
  
  //     return <YouTube videoId={movieVedioApi} opts={opts}  />;
  //   }
  
  //   _onReady(event) {
  //     event.target.pauseVideo();
  //   }
  // };

  const getMovieApi = async() => {
    const getMovieApi = api.get(`/movie/${item.id}?api_key=${API_KEY}&language=en-US`);
    const getGenreListApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const getReviewApi = api.get(`/movie/${item.id}/reviews?api_key=${API_KEY}&language=en-US`);
    const getRealtedApi = api.get(`/movie/${item.id}/recommendations?api_key=${API_KEY}&language=en-US`);
    // const getMovieVedioApi = api.get(`/movie/${item.id}/videos?api_key=${API_KEY}&language=en-US`);

    //let [movieApi, genreApi, reviewApi, realtedApi, movieVedioApi] = await Promise.all([getMovieApi, getGenreListApi, getReviewApi, getRealtedApi, getMovieVedioApi]);
    let [movieApi, genreApi, reviewApi, realtedApi] = await Promise.all([getMovieApi, getGenreListApi, getReviewApi, getRealtedApi]);
    setMovieApiData(movieApi.data);
    setGenreListApi(genreApi.data.genres);
    setReviewApi(reviewApi.data.results);
    setRealtedApi(realtedApi.data);
    // setMovieVedioApi(movieVedioApi.data.results[0].key);
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
                <h5>
                {item.genre_ids.map((id, index)=>(
                  <Badge bg="danger" key={index}>
                    {genreListApi &&  genreListApi.find((item)=>item.id===id).name}
                  </Badge>
                ))}
                </h5>
              </div>
              <h1>{item.title}</h1>
              <div>
                {item.name}
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
              <hr />
              <div><h5>{item.overview}</h5></div>
              <hr />
              <div>
                <h5>
                <div><Badge bg="danger" style={{width:"117px", marginRight:"10px"}}>budget</Badge>${movieApiData.budget}</div>
                <div><Badge bg="danger" style={{width:"117px", marginRight:"10px"}}>revenue</Badge>{movieApiData.revenue}</div>
                <div><Badge bg="danger" style={{width:"117px", marginRight:"10px"}}>release_date</Badge>{movieApiData.release_date}</div>
                <div><Badge bg="danger" style={{width:"117px", marginRight:"10px"}}>runtime</Badge>{movieApiData.runtime}</div>
                </h5>
              </div>
          </div>
        </div>
      </div>
      <div className='movieDetail_reviewRelatedMovies'>
        <div>
          <h2>
            <a style={{border:"2px solid red", margin:"0px 10px 0px 0px ", cursor:"pointer", padding:"5px 5px 5px 5px"}} onClick={(e)=>reViewDivShowHide(e.target.text.slice(0,6))}>
              Review({reviewApi&&reviewApi.length+')'}
            </a>
            <a style={{border:"2px solid red", margin:"0px 10px 0px 0px ", cursor:"pointer", padding:"5px 5px 5px 5px"}} onClick={(e)=>reViewDivShowHide(e.target.text)}>
              RELATED MOVIES
            </a>
          </h2>
        </div>
        <div className='reviewRelatedMovies_Box'>
          {reviewDiv === 'Review' ? 
            <div>
              {reviewApi&&reviewApi.map((item, index) => ( 
                <div key={index}>
                  <div style={{display:"flex",alignItems:"center", marginBottom:"10px"}}>
                    <div style={{
                      backgroundImage:"url("+`${reviewApi[index].author_details.avatar_path&&reviewApi[index].author_details.avatar_path.replace("/","")}`+")",
                      width:"50px",
                      height:"50px",
                      borderRadius:30,
                      marginRight:"10px"
                    }} 
                    />
                    <h4>{reviewApi[index]["author"]}</h4>
                    </div>
                    <div>
                      {reviewApi[index]["content"]}
                    </div>
                    {index === reviewApi.length-1 ? '' : <hr/>}
                </div>
              ))}
            </div> 
            :
            
            <div>
              {!realtedApi.results ? 
                <h3>추천영화가 없습니다.</h3> 
                : 
                <div>
                  <MovieSlide movies={realtedApi} path={"moveDetail"} />
                </div>
             }
            </div>
          }
        </div>
      </div>
      {/* <>
        <Button variant="primary" onClick={handleShow}>
          영화 예고편 보기
        </Button>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Body>
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
      </> */}
    </div>
  )
}

export default MovieDetail