import React, { Component } from "react";
import axios from "axios";
import Loader from "./Loader";
import Navbar from "./Navbar";

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: window.location.href.split("/")[5],
      genreName: "", // Initialize genreName state
      genre_movies: [],
    };
  }

  getGenreName = async () => {
    // Fetch genre name using genre ID
    const genreId = this.state.genre;
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
    try {
      const response = await axios.get(genreUrl);
      const genreList = response.data.genres;
      const genre = genreList.find(genre => genre.id.toString() === genreId);
      if (genre) {
        this.setState({ genreName: genre.name });
      }
    } catch (error) {
      console.error("Error fetching genre name:", error);
    }
  };

  getMoviesByGenre = async () => {
    const randomNum = Math.floor(Math.random() * 4);
    let id = this.state.genre;
    if (this.state.genre !== undefined) {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${this.state.genre}&page=${randomNum}`;
      if (id !== undefined) {
        try {
          let response = await axios.get(`${url}`);
          this.setState({ genre_movies: response.data.results });
        } catch (error) {
          console.error("Error fetching genre movies:", error);
        }
      }
    }
  };
  
  loadMore = async () => {
    const randomNum = Math.floor(Math.random() * 5) + 5;
    let id = this.state.genre;
    if (this.state.genre !== undefined) {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${this.state.genre}&page=${randomNum}`;
      if (id !== undefined) {
        try {
          let response = await axios.get(`${url}`);
          let first = this.state.genre_movies;
          response.data.results.map((movie, index) => {
            first.push(movie);
          });
          this.setState({ genre_movies: first });
        } catch (error) {
          console.error("Error loading more movies:", error);
        }
      }
    }
  };

  componentDidMount() {
    this.getGenreName();
    this.getMoviesByGenre();
  }

  render() {
    return (
      <div className="bg-slate-950 text-white">
        <Navbar />
        {this.state.genre_movies.length > 0 ? (
          <div className="text-start px-1 my-8 mx-1">
            <span className="capitalize font-semibold text-4xl block px-3">
              More {this.state.genreName} movies
            </span>
            <div className="py-3 px-3 grid grid-cols-5">
              {this.state.genre_movies.map((reco, index) => {
                return (
                  <div
                    key={index}
                    className="col-span-4 md:col-span-2 lg:col-span-1 h-96 brightness-50 mx-0.5 my-0.5 bg-cover cursor-pointer duration-100 bg-center bg-no-repeat rounded shadow-lg"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${
                        reco && reco.backdrop_path
                      })`,
                    }}
                    onClick={() => {
                      window.location.href = `http://localhost:3000/movie/${reco.id}`;
                    }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between px-2 mt-1 font-semibold text-white">
                        <span className="brightness-200 hover:bg-gray-100 hover:px-3 hover:py-1 duration-200 hover:brightness-125 hover:rounded-full hover:text-black">
                          {reco.original_title}
                        </span>
                        <span className="text-sm brightness-200 hover:bg-gray-100 hover:px-3 hover:py-1 duration-200 hover:brightness-125 hover:rounded-full hover:text-black">
                          {reco.vote_average}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                onClick={this.loadMore}
                className="flex items-center hover:scale-105 justify-center h-72 brightness-50 mx-0.5 my-0.5 bg-cover cursor-pointer duration-100 bg-center bg-no-repeat rounded shadow-lg bg-gray-100"
              >
                <span className="block">load more</span>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
