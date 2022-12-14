let initialState = {
    popularMovies : {},
    topRatedMovies : {},
    upcomingMovies : {},
    genreList: {},
    movieTrailer: {},
    loading:true
};

function movieReducer(state = initialState, action){
    let {type, payload} = action;
    switch(type) {
        case "GET_MOVIES_SUCCESS" :
            return {
                ...state,
                popularMovies : payload.popularMovies,
                topRatedMovies : payload.topRatedMovies,
                upcomingMovies : payload.upcomingMovies,
                genreList:payload.genreList,
                loading:false
            };
        case "GET_MOVIES_REQUEST" :
            return {
                ...state,
                loading:true
            };
        case "GET_MOVIES_FAILURE" :
            return {
                loading:false
            }
        case "GET_MOVIES_TRAILER" :
            return {
                ...state,
                movieTrailer : payload.movieTrailer
            }
            case "GET_MOVIES_RELEASEDATE" :
                return {
                    ...state,
                    popularMovies : payload.popularMovies,
                }
        default : 
            return {...state};
    }

}

export default movieReducer;