import React, { Component } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import swal from "sweetalert";

export default class UserManagement extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
      users: [],
    };
  }

  componentDidMount() {
    this.verifyLogin();
  }

  getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/users/");
      if (response.status === 200) {
        this.setState({
          users: response.data.data,
        });
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  deleteThisUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/admin/delete/${userId}`
      );
      if (response.status === 200) {
        this.getUsers();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  verifyLogin = async () => {
    const token = localStorage.getItem("adminLogin");

    if (token !== "true") {
      swal("Error", "Login needed to access this page", "error").then(() => {
        window.location.href = "http://localhost:3000/admin-login";
      });
    } else {
      this.setState({ loggedin: true });
      this.getUsers();
    }
  };

  render() {
    return (
      <div className="bg-slate-950 text-white">
        <AdminNavbar />
        <br />
        <table className="w-full text-left rtl:text-right text-black w-[50vw] ml-[50px]">
          <thead className="text-white uppercase ">
            <tr>
              <th>Sr no.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Account Created</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody className="py-[20px] text-white">
            {this.state.users.map((user, index) => (
              <tr key={user._id} className="py-[10px]">
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="text-white bg-red-700 py-[10px] px-[20px]"
                    onClick={() => this.deleteThisUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
