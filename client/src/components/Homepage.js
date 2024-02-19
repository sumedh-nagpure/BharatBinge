import React, { Component } from "react";
import axios from "axios";
import PopularMovies from "./PopularMovies";
import UpcomingMovies from "./UpcomingMovies";
import LatestMovie from "./LatestMovie";
import NowPlaying from "./NowPlaying";
import Loader from "./Loader";
import NavbarLogin from "./NavbarLogin";
import NavbarLogout from "./NavbarLogout";
import TopRated from "./TopRated";
import swal from "sweetalert";
import Recommendations from "./Recommendations";



//acb28ff1eb1c5b2acf8a71c6b39858a4
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      popular_movies: [],
      upcoming_movies: [],
      latest_movie: [],
      loggedin: false,
      now_playing: [],
      top_rated: [],
    };
  }

  verifyLogin = async () => {
    let token = localStorage.getItem("moviesToken")
    if (token) {
      try {
        
        // Make a GET request to the /verify-login endpoint
        const response = await axios.post(
          "http://localhost:8000/users/verifyLogin",
          {},
          {
            headers: {
              "authorization": `token ${token}`,
            },
          }
        );

        // If verification succeeds, set loggedIn state to true
        if (response.data.verified) {
         
          this.setState({ loggedin: true });
        }
      } catch (error) {
        console.log("error : ", error)
        console.error(error);
      }
    }

  };

  getLatestMovies = async () => {
    try {
      let response = await axios.get(`
      https://api.themoviedb.org/3/movie/latest?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);

      this.setState({ latest_movie: response.data });
    } catch (error) { }
  };
  getPopularMovies = async () => {
    try {
      let response = await axios.get(`
      https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);

      this.setState({ popular_movies: response.data.results });
    } catch (error) { }
  };
  getTopRatedMovies = async () => {
    try {
      let response = await axios.get(`
      https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);

      this.setState({ top_rated: response.data.results });
    } catch (error) { }
  };
  getUpcomingMovies = async () => {
    try {
      let response = await axios.get(`
      https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);

      this.setState({ upcoming_movies: response.data.results });
    } catch (error) { }
  };
  getNowPlaying = async () => {
    try {
      let response = await axios.get(`
      https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);

      this.setState({ now_playing: response.data.results });
    } catch (error) { }
  };
  Recommendations = async () => {
    try {
      let response = await axios.get(`
      https://api.themoviedb.org/3/movie/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);

      this.setState({ recommendations: response.data.results });
    } catch (error) { }
  };





  componentDidMount() {
    this.verifyLogin();
    this.getPopularMovies();
    this.getTopRatedMovies();
    this.getNowPlaying();
    this.getUpcomingMovies();
    this.getLatestMovies();
    this.Recommendations();


  }
  render() {
    return (
      <div>
        {" "}
        {this.state.loggedin === false ? <NavbarLogin /> : <NavbarLogout />}
        {/* <LatestMovie latest_movie={ this.state.latest_movie} /> */}
        {this.state.top_rated.length !== 0 &&
          this.state.now_playing.length !== 0 &&
          this.state.popular_movies.length !== 0 ? (
          <div className="bg-slate-950 text-white">
            <NowPlaying now_playing={this.state.now_playing} />
            <PopularMovies popular_movies={this.state.popular_movies} />
            <TopRated top_rated={this.state.top_rated} />
            <UpcomingMovies upcoming_movies={this.state.upcoming_movies} />
            <Recommendations recommendations={this.state.upcoming_movies} />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
