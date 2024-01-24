/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState("");
  const navigate = useNavigate();
  const { getUserData } = useContext(AuthContext);

  const cardStyles = {
    card: {
      width: "100%",
      maxWidth: "300px",
      minWidth: "200px",
      height: "250px",
      backgroundColor: "#292929",
      margin: "10px",
      borderRadius: "10px",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.24)",
      border: "2px solid rgba(7, 7, 7, 0.12)",
      fontSize: "16px",
      transition: "all 0.3s ease",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      cursor: "pointer",
      fontFamily: "'Poppins', sans-serif",
    },
    icon: {
      margin: "0 auto",
      width: "100%",
      height: "80px",
      maxWidth: "80px",
      background:
        "linear-gradient(90deg, #7eaaff 0%, #ff48fb 40%, rgba(0, 0, 0, 0.28) 60%)",
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.8s ease",
      backgroundPosition: "0px",
      backgroundSize: "200px",
    },
    icon_svg: { fill: "white" },
    card__title: {
      width: "100%",
      margin: "0",
      textAlign: "center",
      marginTop: "30px",
      color: "white",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "4px",
    },
    card__text: {
      width: "80%",
      margin: "0 auto",
      fontSize: "13px",
      textAlign: "center",
      marginTop: "20px",
      color: "white",
      fontWeight: "200",
      letterSpacing: "2px",
      opacity: "0",
      maxHeight: "0",
      transition: "all 0.3s ease",
    },
    card_hover: { height: "270px" },
    card_hover__text: {
      transition: "all 0.3s ease",
      opacity: "1",
      maxHeight: "40px",
    },
    card_hover__icon: {
      backgroundPosition: "-120px",
      transition: "all 0.3s ease",
    },
    card_hover__icon_svg_path: {
      fill: "url('#gradientColor')",
      transition: "all 0.3s ease",
    },
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    const loginUser = { email, password };

    axios
      .post(`https://house-hunter-server-indol.vercel.app/login`, loginUser)
      .then((res) => {
        const token = res.data;
        localStorage.setItem("token", token);
        if (localStorage.getItem("token")) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Welcome to HouseHunter",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
          getUserData();
        }
      });
  };

  return (
    <div className="max-w-2xl mx-auto my-10">
      <div className="bg-whote pb-20 pt-10  shadow-md p-20 mt-5">
        <h3 className="text-4xl text-center my-10 text-green-500 font-semibold">
          Login Now
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-5">
            <label className="" htmlFor="text">
              Your Email
            </label>
            <input
              className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-green-500"
              {...register("email")}
              required
            />
          </div>
          <div className="pt-5 relative">
            <label className="" htmlFor="text">
              Your Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className=" w-full t p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-green-500"
              {...register("password")}
              required
            />
            {!showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(true)}
                className="absolute text-xl"
                style={{ top: "70px", right: "10px" }}
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(false)}
                className="absolute text-xl"
                style={{ top: "70px", right: "10px" }}
              />
            )}
          </div>
          <button
            type="submit"
            className="group my-6 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>
        <p className="text-center text-red-500 pt-5">
          {showError && showError}
        </p>
        <p className="text-center pt-5 ">
          Don't have an account?{" "}
          <Link className="text-green-500" to="/signup">
            Signup
          </Link>
        </p>
      </div>
      <div style={cardStyles.card}>
        <div style={cardStyles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            height="38px"
            width="38px"
            version="1.1"
            id="heart"
            viewBox="0 0 471.701 471.701"
            xml:space="preserve"
          >
            {/* ... (SVG content) */}
          </svg>
        </div>
        <p style={cardStyles.card__title}>Favourites</p>
        <p style={cardStyles.card__text}>
          Check all your favourites in one place.
        </p>
      </div>
    </div>
  );
};

export default Login;
