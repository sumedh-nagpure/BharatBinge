import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import NavbarLogout from "./NavbarLogout";
import logo from "../../src/BB.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            if (email === "panel@admin.com" && password === "adminpass") {
                localStorage.setItem("adminLogin", true);
                navigate("/admin");
            }
            else {
                swal("Error", "Please enter correct password and email", "error").then((value) => {
                    // window.location.href = "http://localhost:3000/admin-login"
                  })
            }
           
        } catch (error) {
            if (
                error.response.status === 404 ||
                error.response.status === 401 ||
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
                    className="  h-fit py-1 px-16 pt-16 pb-16 mt-20 backdrop-blur-sm border-2 border-r-[#E50914] border-t-[#E50914] border-l-[#E50914]  border-b-[#E50914] border-b  border-t border-r border-l rounded  "
                >
                    <center>
                        <img
                            onClick={() => {
                                navigate("/");
                            }}
                            src={logo}
                            className="h-10 text-center block cursor-pointer hover:h-12 duration-100 "
                        />
                    </center>
                    <span className="text-white text-start my-3 mt-12 block text-4xl">
                        Admin Login
                    </span>
                    <div className="my-5">

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
                        Log in
                    </button>

                </form>
            </div>
        </div>
    );
}
