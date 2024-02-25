import React, { Component } from "react";
import AccountInformation from "./AccountInformation";
import Loader from "./Loader";
import NavbarLogout from "./NavbarLogout";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Watchlist from "./Watchlist";
import Watched from "./Watched";
import Likes from "./Likes";
import Dislikes from "./Dislikes";
import AdminNavbar from "./AdminNavbar";
import swal from "sweetalert";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
      users: [],
    };
  }

  getUsers = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8000/admin/users/`,
      );
      if (response) {
        if (response.status === 200) {
          this.setState({
            users: response.data.data,
          });
        }
      }
    } catch (error) {
      console.log("error : ", error)

    }
  };
  deleteThisUser = async (userid) => {
    try {
      let response = await axios.delete(
        `http://localhost:8000/admin/delete/${userid}`,
      );
      if (response) {
        if (response.status === 200) {
          this.getUsers()
        }
      }
    } catch (error) {
      console.log("error : ", error)
    }
  };

  verifyLogin = async () => {
    const token = localStorage.getItem("adminLogin");

    if (token != "true") {
      swal("Error", "Login needed to access this page", "error").then(() => {
        window.location.href = "http://localhost:3000/admin-login";
      });
    } else {
      console.log("settings", token);
      this.setState({ loggedin: token });
      this.getUsers();
    }
  };

  componentDidMount() {
    this.verifyLogin();



  }
  render() {
    return (

      <div className=" text-white">
        <AdminNavbar /> <br />

        <table class="w-full  text-left rtl:text-right text-black  w-[50vw] ml-[50px] ">
          <thead className="text-white uppercase bg-black">
            <tr>
              <th>Sr no.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Account Created</th>
              {/* <th>Block User</th> */}
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody className="py-[20px]">
            {this.state.users?.map((user, index) => {
              return (
                <tr className="py-[10px]">
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt}</td>
                  {/* <td><button>Block</button></td> */}
                  <td><button className="text-white bg-red-700 py-[10px] px-[20px]" onClick={() => {
                    this.deleteThisUser(user._id)
                  }}>Delete</button></td>
                </tr>
              )
            })}


          </tbody>
        </table>
      </div>
    );
  }
}
