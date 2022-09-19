import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../component/MovieCard';
import { movieAction } from '../redux/actions/movieAction';


const Movies = () => {
  const [pageNum,setPageNum] = useState(1);
  const [totalPageNum,setTotalPageNum] = useState(0);
  const [startPageNum,setStartPageNum] = useState(0);
  const [endPageNum,setEndPageNum] = useState(0);
  const [showPageNum, setShowPageNum] = useState([1,2,3,4,5]);
  const [nextPrev,setNextPrev] = useState("")

  const dispatch = useDispatch();
  const {popularMovies, topRatedMovies, upcomingMovies, loading} = useSelector(state=>state.movie);
  useEffect(()=>{
    dispatch(movieAction.getMovies(pageNum));
    setTotalPageNum(popularMovies.total_pages);
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

  return (
    <div>
      <div>
        {popularMovies&&popularMovies.results.map((item,index) => (
          <MovieCard item={item} key={index} />
        ))}
      </div>
      <div>
        <a onClick={(e)=>{nextPrevFunction(e.target.text)}}>{'<<'}</a><a onClick={(e)=>{nextPrevFunction(e.target.text)}}>{'<'}</a>
          {showPageNum.map((item,index) => (
            <a key={index} style={{marginRight:"10px", cursor:"pointer"}} onClick={(e)=>{movePage(e.target.text)}}>{showPageNum[index]}</a>
          ))}
        <a onClick={(e)=>{nextPrevFunction(e.target.text)}}>{'>'}</a><a onClick={(e)=>{nextPrevFunction(e.target.text)}}>{'>>'}</a>
      </div>
    </div>
  )
}

export default Movies