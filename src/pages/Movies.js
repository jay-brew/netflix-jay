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
  const [keyword, setKeyword] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  
  const [sort, setSort] = useState("");
  
  const [genreFilterList, setGenreFilterList] = useState("");

  const [pageNum,setPageNum] = useState(1);
  const [totalPageNum,setTotalPageNum] = useState(0);
  const [showPageNum, setShowPageNum] = useState([]);

  const [rangeState, setRangeState] = useState({});

  let [genresBtnValue, setGenresBtnValue] = useState('All');

  const dispatch = useDispatch();
  const {popularMovies, genreList} = useSelector(state=>state.movie);
  console.log(rangeState.length)
  
  useEffect(()=>{
    if(rangeState.length!==undefined){dispatch(movieAction.releaseDate(rangeState.value.min, rangeState.value.max))}
    // console.log("hihihi :" + rangeState.value.min);
    // if(rangeState!==0){
      // console.log(rangeState)
      // dispatch(movieAction.releaseDate(rangeState.value.min, rangeState.value.max));
    // }
  },[rangeState]);

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
        setShowPageNum([1,2,3,4,5]);
        setSearchMovies([]);
      } else {
        
      }
    } catch (error) {

    }
  };

  useEffect(()=>{
    dispatch(movieAction.getMovies(pageNum));
    setTotalPageNum(popularMovies.total_pages);
    if(popularMovies.total_pages > 6){
      setShowPageNum([1,2,3,4,5]);
    }
    let rangeStateUpdtate = {value: { min: 1990, max: 2022 }}
    setRangeState(rangeStateUpdtate);
    dispatch(movieAction.releaseDate(rangeStateUpdtate.value.min, rangeStateUpdtate.value.max))
  },[pageNum]);

  // useEffect(()=>{

  // },[genreClickValue]);

  useEffect(()=>{
    if(keyword !== ""){
      setGenresBtnValue('All');
      setGenreFilterList([]);
      getMovieApi();
    }
  },[keyword]);  

  useEffect(()=>{
    if(sort === "desc") {
      popularMovies.results.sort(function(a,b){
        return b.vote_average-a.vote_average;
      })
    } else if(sort==="asc"){
      popularMovies.results.sort(function(a,b){
        return a.vote_average-b.vote_average;
      })
    } else {
  
    }
  },[sort]);

  const nextPrevFunction = (nextPrevText) => {
    let updateShowPageNum = new Array();
    if(nextPrevText === '>') {
      const lastNum = showPageNum[showPageNum.length-1]
      for(let i=lastNum+1; i<lastNum+6; i++){
        updateShowPageNum.push(i);
      }
      setShowPageNum(updateShowPageNum);
    } else if(nextPrevText === '>>') {
      const totalStartNum = totalPageNum-totalPageNum%showPageNum.length+1
      for(let i=totalStartNum; i<totalPageNum+1; i++){
        updateShowPageNum.push(i);
      }
      setShowPageNum(updateShowPageNum);
      
    } else if(nextPrevText === '<') {
      const firstNum = showPageNum[0];
      if(firstNum !== 1) {
        for(let i=firstNum-5; i<firstNum; i++){
          updateShowPageNum.push(i);
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

  const genresBtnClick = (genresBtnValue) => {
    if(keyword !== "") {
      setKeyword("");
    }
    setGenresBtnValue(genresBtnValue);
    if(genresBtnValue !== "All"){
      let genreId = genreList.find((item)=>{
        if(item.name===genresBtnValue)return item
      });
      let genreFilter = popularMovies.results.filter((item)=>{
        if(item.genre_ids.indexOf(genreId.id) !== -1) return item;
      })
      if(genreFilter.length===0)genreFilter.push()
      setShowPageNum([1]);
      setSearchMovies([]);
      setGenreFilterList(genreFilter);
    } else {
      if(popularMovies.total_pages>6){
        setShowPageNum([1,2,3,4,5]);
      } else {
        let showPage = new Array();
        for(let i=1; i<popularMovies.total_pages+1; i++){
          showPage.push(i);
        }
        setShowPageNum(showPage);
      }
      setGenreFilterList([]);
    }
  }


  return (
    <div style={{display:"flex"}}>
      <div style={{padding:"3% 0% 3% 3%", width:"500px"}}>
        <div style={{marginBottom:"40px"}}>
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
          <Button variant="outline-danger" style={{marginRight:"10px"}} onClick={()=>{setSort("desc")}}>평점 내림차순</Button>
          <Button variant="outline-danger" onClick={()=>{setSort("asc")}}>평점 오름차순</Button>
        </div>
        <div>
          <h2>Genres</h2>
            <Button style={{marginRight:"10px",marginBottom:"10px"}} onClick={(event)=>{genresBtnClick("All")}}>All</Button>
          {genreList.map((item,index)=>(
            <Button style={{marginRight:"10px",marginBottom:"10px"}} onClick={(event)=>{genresBtnClick(event.target.textContent)}}>{item.name}</Button>
          ))}
        </div>
      </div>
      <div style={{width:"100%"}}>
        <div style={{margin:"3% 8% 0% 0%"}}>
          <Row xs={1} md={2} style={{justifyContent:"center", marginBottom:"40px"}}>
              {
                searchMovies.length===0&&genreFilterList.length===0
                ?                 
                  Object.keys(popularMovies).length !== 0&&popularMovies.results.map((item,index) => (
                    <Col lg={3} key={index}>
                      {genresBtnValue !== "All" ? '' : <MovieCard item={item} key={index} path={"movies"}/>}
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