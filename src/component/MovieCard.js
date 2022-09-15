import React from 'react'

const MovieCard = ({item}) => {
  console.log("item : ", item)
  return (
    <div className='card' style={{
            backgroundImage:"url("+`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}`+")"
        }}>
    </div>
  )
}

export default MovieCard


