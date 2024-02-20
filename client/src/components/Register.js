import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import logo from "../../src/BB.png";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName) {
      // setErrorMessage('Please enter your email');
      swal("Invalid input", "Please enter your first name", "warning");
      return;
    }
    if (!lastName) {
      // setErrorMessage('Please enter your email');
      swal("Invalid input", "Please enter your last name", "warning");
      return;
    }
    if (!age) {
      // setErrorMessage('Please enter your email');
      swal("Invalid input", "Please enter your age", "warning");
      return;
    }
    if (!email) {
      // setErrorMessage('Please enter your email');
      swal("Invalid input", "Please enter your email", "warning");
      return;
    }
    if (!password) {
      swal("Invalid input", "Please enter your password", "warning");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/users/", {
        email,
        password,
        age,
        firstName,
        lastName,
      });
      if (response.status === 200) {
        swal(
          "Account Created",
          "Login  to access your account.",
          "success"
        ).then((value) => {
          if (value) {
            navigate("/login");
          }
        });
      }
    } catch (error) {
      if (
        error.response.status === 404 ||
        error.response.status === 401 ||
        error.response.status === 400 ||
        error.response.status === 500
      ) {
        swal(
          error.response.data.swal_title,
          error.response.data.swal_message,
          "error"
        );
      } else {
        swal("OOPS", "no response from backend", "error");
      }
    }
  };

  return (
    <div className="h-screen">
      {/* <Navbar /> */}
      <div className=" flex brightness-25 loginDiv h-full bg-center bg-cover bg-no-repeat bg-[url('../../src/BB.png')]  justify-center   ">
        <form
          onSubmit={handleSubmit}
          className="  h-fit py-1 px-16 pt-16 pb-16 mt-10 backdrop-blur-sm border-2 border-r-[#E50914] border-t-[#E50914] border-l-[#E50914]  border-b-[#E50914] border-b  border-t border-r border-l rounded  "
        >
          <center>
            <img
              onClick={() => {
                navigate("/login");
              }}
              src={logo}
              className="h-10 text-center block cursor-pointer hover:h-12 duration-100 "
            />
          </center>
          <span className="text-white text-start mt-5 my-3 block text-4xl">
            Create Account
          </span>
          <div className="my-5">
            {/* <label
            htmlFor="email"
            className="block text-start  my-1 text-lg  text-white"
          >
            Email:
          </label> */}
            <input
              placeholder="First name"
              type="text"
              id="email"
              name="first name"
              className="block text-start  my-1 text-lg text-white bg-transparent border-b font-light      w-full  py-1 px-2 text-center  "
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="my-5">
            {/* <label
            htmlFor="email"
            className="block text-start  my-1 text-lg  text-white"
          >
            Email:
          </label> */}
            <input
              placeholder="Last name"
              type="text"
              id="lastName"
              name="lastName"
              className="block text-start  my-1 text-lg text-white bg-transparent border-b font-light      w-full  py-1 px-2 text-center  "
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="my-5">
            {/* <label
            htmlFor="email"
            className="block text-start  my-1 text-lg  text-white"
          >
            Email:
          </label> */}
            <input
              placeholder="Age"
              type="number"
              id="age"
              name="age"
              className="block text-start  my-1 text-lg text-white bg-transparent border-b font-light      w-full  py-1 px-2 text-center  "
              value={age}
              onChange={handleAgeChange}
            />
          </div>
          <div className="my-5">
            {/* <label
            htmlFor="email"
            className="block text-start  my-1 text-lg  text-white"
          >
            Email:
          </label> */}
            <input
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              className="block text-start  my-1 text-lg text-white bg-transparent border-b font-light      w-full  py-1 px-2 text-center  "
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="my-5">
            {/* <label
            htmlFor="email"
            className="block text-start  my-1 text-lg  text-white"
          >
            Email
          </label> */}
            <input
              type="password"
              id="email"
              placeholder="Password"
              name="email"
              className="block text-start  my-1 text-lg text-white bg-transparent border-b  font-light   w-full  py-1 px-2 text-center   "
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <button
            type="submit"
            class="border-2 text-white text-xl bg-black rounded py-2 px-6   border-[#E50914]"
          >
            Register
          </button>
          <div className="text-start  mt-3 text-[#E50914]  hover:scale-110 duration-200 cursor-pointer   ">
            <span onClick={() => {
              navigate('/login')
            }}>Already have a account  ? Login </span>
          </div>
        </form>
      </div>
    </div>
  );
}
