import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../component/Dropdown';
import MovieCard from '../component/MovieCard';
import { movieAction } from '../redux/actions/movieAction';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import api from '../redux/api';

const API_KEY=process.env.REACT_APP_API_KEY;
const Movies = () => {
  const [rangeState, setRangeState] = useState({});
  const [pageNum,setPageNum] = useState(1);
  const [movieId,setMovieId] = useState("");
  const [totalPageNum,setTotalPageNum] = useState(0);
  const [showPageNum, setShowPageNum] = useState([]);
  const [searchMovies, setSearchMovies] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [genreClickValue , setGenreClickValue] = useState("");
  const [genreFilterList, setGenreFilterList] = useState("");

  const dispatch = useDispatch();
  const {popularMovies, genreList} = useSelector(state=>state.movie);

  const getMovieApi = async() => {
    try {
      let showPageNumArray = new Array();
      const searchApi = api.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`);
      let [searchMovies] = await Promise.all([searchApi]);
      if(searchMovies.data.total_pages !== 0 && searchMovies.data.total_pages < 6) {
        for(let i=1; i<searchMovies.data.total_pages+1; i++){
          showPageNumArray.push(i);
        }
        setShowPageNum(showPageNumArray);
        setSearchMovies(searchMovies);
      } else if(searchMovies.data.total_pages === 0){
        setShowPageNum([1,2,3,4,5])
        setSearchMovies(null);
      } else {
        
      }
    } catch (error) {

    }
  };


  useEffect(()=>{
    if(keyword !== ""){
      getMovieApi();
    }
  },[keyword])

  useEffect(()=>{
    dispatch(movieAction.getMovies(pageNum,movieId));
    setTotalPageNum(popularMovies.total_pages);
    if(popularMovies.total_pages > 6){
      setShowPageNum([1,2,3,4,5])
    }
    let rangeStateUpdtate = {value: { min: 1990, max: 2022 }}
    setRangeState(rangeStateUpdtate)
  },[pageNum]);

  useEffect(()=>{
    if(genreClickValue !== ""){
      let genreId = genreList.find((item)=>{
        if(item.name===genreClickValue)return item
      })
      let genreFilter = popularMovies.results.filter((item)=>{
        if(item.genre_ids.indexOf(genreId.id) !== -1) return item;
      })
      setGenreFilterList(genreFilter)
    }
  },[genreClickValue])

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
      setShowPageNum(showPageNum);
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
    <div style={{display:"flex"}}>
      <div style={{padding:"3% 0% 3% 3%"}}>
        <div style={{marginBottom:"40px", width:"300px"}}>
          <InputRange
            maxValue={2022}
            minValue={1990}
            value={rangeState.value}
            onChange={value => setRangeState({ value })}
          />
        </div>
        <div style={{marginBottom:"20px"}}>
          <Dropdown />
        </div>
        <div style={{marginBottom:"20px"}}>
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
        </div>
        <div style={{marginBottom:"20px"}}>
          <Button variant="outline-danger" onClick={()=>{filter()}}>3.0/2.1/5.3/8.5/10평점 기준 필터</Button>
        </div>
        <div>
          <h2>Genres</h2>
          {genreList.map((item,index)=>(
            <Button style={{marginRight:"10px",marginBottom:"10px"}} onClick={(event)=>{setGenreClickValue(event.target.textContent)}}>{item.name}</Button>
          ))}
        </div>
      </div>
      <div>
        <div style={{margin:"3% 8% 0% 0%"}}>
          <Row xs={1} md={2} style={{justifyContent:"center"}}>
              {
                searchMovies===null&&genreFilterList.length===0
                ?                 
                  Object.keys(popularMovies).length !== 0&&popularMovies.results.map((item,index) => (
                    <Col lg={3} key={index}>
                      <MovieCard item={item} key={index} path={"movies"}/>
                    </Col>
                  ))  
                :
                genreFilterList.length!==0
                ?
                  genreFilterList.map((item,index) => (
                    <Col lg={3} key={index}>
                      <MovieCard item={item} key={index} path={"movies"}/>
                    </Col>
                  ))
                :
                  Object.keys(searchMovies).length !== 0&&searchMovies.data.results.map((item,index) => (
                    <Col lg={3} key={index}>
                      <MovieCard item={item} key={index} path={"movies"}/>
                    </Col>
                  ))
              }
          </Row>
        </div>
        <div style={{textAlign:"center"}}>
          <h4>
            <a onClick={(e)=>{nextPrevFunction(e.target.text)}} style={{marginRight:"5px"}}>{'≪'}</a>
            <a onClick={(e)=>{nextPrevFunction(e.target.text)}} style={{marginRight:"5px"}}>{'＜'}</a>
              {showPageNum.map((item,index) => (
                <a key={index} style={{marginRight:"10px", cursor:"pointer"}} onClick={(e)=>{movePage(e.target.text)}}>{showPageNum[index]}</a>
              ))}
            <a onClick={(e)=>{nextPrevFunction(e.target.text)}} style={{marginRight:"5px"}}>{'＞'}</a>
            <a onClick={(e)=>{nextPrevFunction(e.target.text)}}>{'≫'}</a>
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Movies