import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../component/Dropdown';
import MovieCard from '../component/MovieCard';
import { movieAction } from '../redux/actions/movieAction';
//import api from '../redux/api';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

const API_KEY=process.env.REACT_APP_API_KEY;
const Movies = () => {
  const [rangeState, setRangeState] = useState({});
  const [pageNum,setPageNum] = useState(1);
  const [movieId,setMovieId] = useState("");
  const [totalPageNum,setTotalPageNum] = useState(0);
  const [showPageNum, setShowPageNum] = useState([1,2,3,4,5]);
  //const [searchMovies, setSearchMovies] = useState("");
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const {popularMovies, topRatedMovies, upcomingMovies, genreList, loading} = useSelector(state=>state.movie);

  const getMovieApi = async() => {
    // const searchApi = api.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`);
    // let [searchMovies] = await Promise.all([searchApi]);
  };

  useEffect(()=>{
    getMovieApi();
  },[keyword])

  useEffect(()=>{
    dispatch(movieAction.getMovies(pageNum,movieId));
    setTotalPageNum(popularMovies.total_pages);
    let rangeStateUpdtate = {value: { min: 1990, max: 2022 }}
    setRangeState(rangeStateUpdtate)
  },[pageNum]);

  const nextPrevFunction = (nextPrevText) => {
    let updateShowPageNum = new Array();
    if(nextPrevText === '>') {
      const lastNum = showPageNum[showPageNum.length-1]
      for(let i=lastNum+1; i<lastNum+6; i++){
        updateShowPageNum.push(i)
      }
      setShowPageNum(updateShowPageNum);
    } else if(nextPrevText === '>>') {
      const totalStartNum = totalPageNum-totalPageNum%showPageNum.length+1
      for(let i=totalStartNum; i<totalPageNum+1; i++){
        updateShowPageNum.push(i)
      }
      setShowPageNum(updateShowPageNum);
      
    } else if(nextPrevText === '<') {
      const firstNum = showPageNum[0];
      if(firstNum !== 1) {
        for(let i=firstNum-5; i<firstNum; i++){
          updateShowPageNum.push(i)
        }
        setShowPageNum(updateShowPageNum);
      }
    } else {
      // <<
      setShowPageNum([1,2,3,4,5]);
    }
  }

  const movePage = (clickPageNum) => {
    setPageNum(clickPageNum);
  };

  const test =(event) => {
    event.preventDefault();
  }

  const filter = () => {
    let arr = [3.0,2.1,5.3,8.5,10];
    arr.sort(function(a,b){
      return a-b
    })
    alert(arr)
    
    arr.sort(function(a,b){
        return b-a
    })
    alert(arr)

  }

  return (
    <div>
      <InputRange
        maxValue={2022}
        minValue={1990}
        value={rangeState.value}
        onChange={value => setRangeState({ value })} />
      <Dropdown />
      <Form className="d-flex" onSubmit={()=>{test()}}>
        <Form.Control
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-danger" onClick={()=>{test()}}>Search</Button>
      </Form>
        <Button variant="outline-danger" onClick={()=>{filter()}}>3.0/2.1/5.3/8.5/10평점 기준 필터</Button>
        <div>
          <Row xs={1} md={2} className="g-4">
              {Object.keys(popularMovies).length !== 0&&popularMovies.results.map((item,index) => (
                <Col lg={5} key={index}>
                  <MovieCard item={item} key={index} />
                </Col>
              ))}
          </Row>
        </div>
      <div>
        <a onClick={(e)=>{nextPrevFunction(e.target.text)}}>{'<<'}</a><a onClick={(e)=>{nextPrevFunction(e.target.text)}}>{'<'}</a>
          {showPageNum.map((item,index) => (
            <a key={index} style={{marginRight:"10px", cursor:"pointer"}} onClick={(e)=>{movePage(e.target.text)}}>{showPageNum[index]}</a>
          ))}
        <a onClick={(e)=>{nextPrevFunction(e.target.text)}}>{'>'}</a><a onClick={(e)=>{nextPrevFunction(e.target.text)}}>{'>>'}</a>
      </div>
      <h2>Genres</h2>
      <div>
        {genreList.map((item,index)=>(
          <Button style={{marginRight:"10px"}}>{item.name}</Button>
        ))}
      </div>
    </div>
  )
}

export default Movies