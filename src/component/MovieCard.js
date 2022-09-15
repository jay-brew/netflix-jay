import React from 'react'
import { Badge } from 'react-bootstrap'

const MovieCard = ({item}) => {
  console.log("item : ", item)
  return (
    <div className='card' style={{
            backgroundImage:"url("+`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}`+")"
        }}>
          <div className='overlay'>
            <h1>{item.title}</h1>
            <div>
              {item.genre_ids.map((id)=>(
                <Badge bg="danger">id</Badge>
              ))}
            </div>
            <div><span>{item.vote_average}</span><span>{item.adult ? "청불" : "Under 18"}</span></div>
          </div>
    </div>
  )
}

export default MovieCard


