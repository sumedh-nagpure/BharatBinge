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

class AdminDashboard extends Component {
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
    let token = localStorage.getItem("adminLogin");
    console.log("token ", token)
    if (typeof token === "undefined" || token === null || token === "" || !token) {
      swal("Error", "Login needed to access this page", "error").then((value) => {
        window.location.href = "http://localhost:3000/admin-login"
      })
    }
    else {
      console.log("settings")
      this.setState({ loggedin: true })
    }
  };

  componentDidMount() {
    this.verifyLogin();
    console.log("this.state.loggedin: ", this.state.logged)

    this.getUsers();

  }
  render() {
    return (
      <div className="bg-slate-950 text-white h-screen ">
        <AdminNavbar /> <br />

        <div className="overflow-x-auto w-[75vw] ml-[50px]">
          <table className="min-w-full">
            <thead className="text-white">
              <tr>
                <th className="px-4 py-2">Sr no.</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Account Created</th>
                <th className="px-4 py-2">Delete User</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {this.state.users?.map((user, index) => {
                return (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{user.firstName}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.createdAt}</td>
                    <td className="border px-4 py-2">
                      <button className="text-white bg-red-700 py-1 px-2" onClick={() => {
                        this.deleteThisUser(user._id)
                      }}>Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
