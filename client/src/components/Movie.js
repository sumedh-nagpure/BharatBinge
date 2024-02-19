// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import axios from "axios";

// import { useNavigate } from "react-router-dom";

// export default function Movie() {

//   const [showReviews, setShowReviews] = useState(false);

//   //

//   //

//   return (
//     <>
//       {/* {false? ( */}
//       {provider.length !== 0 &&
//       recommendations.length !== 0 &&
//       movie.length !== 0 &&
//       reviews.length !== 0 ? (
//         <div className="">
//           <Navbar />
//           <div class="grid grid-cols-5 h-fit  lg:gap-8 my-8  ">

//             <div className=" text-start px-8 py-3 col-span-5 lg:col-span-3 ">

//             </div>
//           </div>
//          <Reviews/>
//           <Recommendations
//             title={movie.original_title}
//             recommendations={recommendations}
//           />

//         </div>
//       ) : (
//         <Loader />
//       )}
//     </>
//   );
// }

import React, { Component } from "react";
import axios from "axios";
import Recommendations from "./Recommendations";
import Reviews from "./Reviews";
import NavbarLogout from "./NavbarLogout";
import NavbarLogin from "./NavbarLogin";
import Loader from "./Loader";
import MoviePosterDiv from "./MoviePosterDiv";
import MovieInformationDiv from "./MovieInformationDiv";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
      movie_id: window.location.href.split("/")[4],
      movie: "",
      recommendations: [],
      provider: "",
      reviews: "",
      cast: "",
    };
  }
  verifyLogin = async () => {
    try {
      // Make a GET request to the /verify-login endpoint
      const response = await axios.post(
        "http://localhost:8000/users/verifyLogin",
        {},
        {
          headers: {
            "authorization": `token ${localStorage.getItem("moviesToken")}`,
          },
        }
      );

      // If verification succeeds, set loggedIn state to true
      if (response.data.verified) {
        this.setState({ loggedin: true });
      }
    } catch (error) {
      console.error(error);
    }
  };
  getProviders = async () => {
    let id = this.state.movie_id;
    if (id !== undefined) {
      try {
        let response = await axios.get(`
              https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);

        let results = response.data.results;

        this.setState({ provider: results[Object.keys(results)[0]] });
      } catch (error) {}
    }
  };
  getReviews = async () => {
    let id = this.state.movie_id;

    if (id !== undefined) {
      try {
        let response = await axios.get(`
      
      https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);

        this.setState({ reviews: response.data.results });
      } catch (error) {}
    }
  };
  getRecommendations = async () => {
    let id = this.state.movie_id;
    if (id !== undefined) {
      try {
        let response = await axios.get(`
              https://api.themoviedb.org/3/movie/${id}}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);

        this.setState({ recommendations: response.data.results });
      } catch (error) {}
    }
  };
  getCast = async () => {};
  getMovies = async () => {
    let id = this.state.movie_id;
    if (id !== undefined) {
      try {
        let response = await axios.get(`
        https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);

        this.setState({ movie: response.data });
      } catch (error) {}
    }
  };
  componentDidMount() {
    this.verifyLogin();
    this.getCast();
    this.getMovies();
    this.getProviders();
    this.getRecommendations();

    this.getReviews();
  }
  render() {
    return (
      <div>
        {this.state.movie !== undefined  ? (
          <div>
             {this.state.loggedin === true ? <NavbarLogout /> : <NavbarLogin />}
            <div className="grid grid-cols-5 ">
              <div className="col-span-5 lg:col-span-2">
                {" "}
                <MoviePosterDiv
                  backdrop_path={this.state.movie.backdrop_path}
                />
              </div>
              <div className="col-span-5 lg:col-span-3 ">
                <MovieInformationDiv
                  movie={this.state.movie}
                  provider={this.state.provider}
                />
              </div>
            </div>
            <div className="">
              {" "}
              <Reviews reviews={this.state.reviews} />
            </div>
            <div className="">
              {" "}
              <Recommendations
                recommendations={this.state.recommendations}
                title={this.state.movie.original_title}
              />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
