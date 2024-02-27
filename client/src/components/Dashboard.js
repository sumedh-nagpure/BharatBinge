import React, { Component } from "react";
import AccountInformation from "./AccountInformation";
import Loader from "./Loader";
import NavbarLogout from "./NavbarLogout";
import axios from "axios";
import Watchlist from "./Watchlist";
import Likes from "./Likes";
import Dislikes from "./Dislikes";
import swal from "sweetalert";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
      showOption: "watchlist",
      accountinformation: [],
    };
  }

  getAccountInformation = async () => {

    let token = localStorage.getItem("moviesToken");

    try {
      if (token !== "" && token !== undefined) {
        let response = await axios.post(
          `http://localhost:8000/users/individual/`,
          {},
          {
            headers: {
              authorization: `token ${token}`,
            },
          }
        );
        if (response) {
          if (response.status === 200) {


            this.setState({
              accountinformation: response.data.user,
            });
          }

        }
      }
    } catch (error) {

      swal("Error", "Login needed to access this page", "error").then((value) => {
        window.location.href = "http://localhost:3000/login"
      })
    }
  };
  showOption = (option) => {
    this.setState({ showOption: option });
  };
  verifyLogin = async () => {
    let token = localStorage.getItem("moviesToken");
    if (typeof token === "undefined" || token === null || token === "") {

      // token is undefined, null, or an empty string
      // do something here, such as displaying an error message
    } else {

      let url = `http://localhost:8000/users/verifyToken`;
    }
  };
  componentDidMount() {
    // this.verifyLogin();
    this.getAccountInformation();
  }
  render() {
    return (
      <div className=" bg-slate-950 text-white">

        <NavbarLogout /> <br />
        <div className="  grid grid-cols-5 bg-slate-950 text-white lg:h-screen ">
          <div className="col-span-5 lg:col-span-1  border-r border-[#E50914]">
            <div className="grid lg:grid-cols-1 grid-cols-2  px-[20px]">
              <span
                onClick={() => {
                  this.showOption("accountinformation");
                }}
                className={`text-lg   lg:text-2xl ${this.state.showOption === "accountinformation" &&
                  "lg:pb-3 border-b border-b-[#E50914]"
                  }   lg:mx-4  w-fitinline text-start lg:px-2 my-5 hover:text-gray-100  hover:border-b-[#E50914] cursor-pointer hover:border-b hover:pb-3  duration-100 `}
              >
                Account Information
              </span>
              <span
                onClick={() => {
                  this.showOption("watchlist");
                }}
                className={`text-lg   lg:text-2xl ${this.state.showOption === "watchlist" &&
                  "pb-3 border-b border-b-[#E50914]"
                  }   lg:mx-4  w-fitinline text-start lg:px-2 my-5 hover:text-gray-100  hover:border-b-[#E50914] cursor-pointer hover:border-b hover:pb-3  duration-100 `}
              >
                Your watchlist
              </span>
              <span
                onClick={() => {

                  this.showOption("likes");
                }}
                className={`text-lg   lg:text-2xl ${this.state.showOption === "likes" &&
                  "pb-3 border-b border-b-[#E50914]"
                  }    lg:mx-4  w-fitinline text-start lg:px-2 my-5 hover:text-gray-100  hover:border-b-[#E50914] cursor-pointer hover:border-b hover:pb-3  duration-100 `}
              >
                Likes
              </span>
              <span
                onClick={() => {
                  this.showOption("dislikes");
                }}
                className={`text-lg   lg:text-2xl ${this.state.showOption === "dislikes" &&
                  "pb-3 border-b border-b-[#E50914]"
                  }  lg:mx-4  w-fitinline text-start lg:px-2 my-5 hover:text-gray-100  hover:border-b-[#E50914] cursor-pointer hover:border-b hover:pb-3  duration-100 `}
              >
                Disliked
              </span>
            </div>
          </div>
          <div className="lg:col-span-4 col-span-5  ">
            {this.state.showOption !== null &&
              this.state.showOption === "likes" &&
              (this.state.accountinformation.length !== 0 ? (
                <Likes
                  getAccountInformation={this.getAccountInformation}
                  accountinformation={this.state.accountinformation}
                />
              ) : (
                <Loader size={100} bg="bg-black" msg="Loading your likes" />
              ))}
            {this.state.showOption !== null &&
              this.state.showOption === "accountinformation" &&
              (this.state.accountinformation.length !== 0 ? (
                <AccountInformation
                  accountinformation={this.state.accountinformation}
                />
              ) : (
                <Loader
                  size={100}
                  bg="bg-black"
                  msg="Loading your account details"
                />
              ))}
            {this.state.showOption !== null &&
              this.state.showOption === "watchlist" &&
              (this.state.accountinformation.length !== 0 ? (
                <Watchlist
                  accountinformation={this.state.accountinformation}
                  getAccountInformation={this.getAccountInformation}
                />
              ) : (
                <Loader size={100} bg="bg-black" msg="Loading your watchlist" />
              ))}
            {this.state.showOption !== null &&
              this.state.showOption === "dislikes" &&
              (this.state.accountinformation.length !== 0 ? (
                <Dislikes
                  getAccountInformation={this.getAccountInformation}
                  accountinformation={this.state.accountinformation}
                />
              ) : (
                <Loader size={100} bg="bg-black" msg="Loading your dislikes" />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

// movie_title , movie_rating , movie_id , movie_backdrop_path
