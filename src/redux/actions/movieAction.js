import api from "../api";

const API_KEY=process.env.REACT_APP_API_KEY;
function getMovies(pageNum){
    return async(dispatch) => {
        try {
            console.log("movieAction.js")
            dispatch({type:"GET_MOVIES_REQUEST"});
            
            pageNum !== undefined ? pageNum = pageNum : pageNum = 1;
            const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`);
            const topRatedApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
            const upComingApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);

            let [popularMovies, topRatedMovies, upcomingMovies, genreList] = await Promise.all([popularMovieApi,topRatedApi,upComingApi,genreApi]);

            dispatch({
                type : "GET_MOVIES_SUCCESS",
                payload : {
                    popularMovies:popularMovies.data,
                    topRatedMovies:topRatedMovies.data,
                    upcomingMovies:upcomingMovies.data,
                    genreList:genreList.data.genres
                }
            })
        } catch (error) {
            dispatch({type:"GET_MOVIES_FAILURE"})
        }
    }
}

export const movieAction = {
    getMovies,
}