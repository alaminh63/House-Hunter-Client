import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useOwner from "../../hooks/useOwner";
import { AuthContext } from "../../providers/AuthProvider";
import "./House.css";

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [booking, setBooking] = useState([]);
  const [seachText, setsearchText] = useState("");
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [availability, setAvailability] = useState("");
  const [minRent, setMinRent] = useState(0);
  const [maxRent, setMaxRent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // get user booking house
  useEffect(() => {
    axios
      .get(
        `https://house-hunter-server-indol.vercel.app/mybooking/${user?.email}`
      )
      .then(
        (res) => {
          setBooking(res.data);
        },
        [user]
      );
  });

  //   handler for searching
  const handleSearchText = () => {
    fetch(
      `https://house-hunter-server-indol.vercel.app/housesearch/${seachText}`
    )
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
      });
  };
  //   "Enter" key press to search"
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchText();
    }
  };

  // filter by user preferences.
  useEffect(() => {
    axios
      .get(
        `https://house-hunter-server-indol.vercel.app/houses?city=${city}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&room_size=${roomSize}&availability_date=${availability}&minRent=${minRent}&maxRent=${maxRent}&page=${currentPage}`
      )
      .then((res) => {
        setTotalPages(res.data.totalPages);
        setHouses(res.data.result);
      });
  }, [
    city,
    bedrooms,
    bathrooms,
    roomSize,
    availability,
    minRent,
    maxRent,
    currentPage,
  ]);

  //  Change by pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //   Check House Owner
  const [isOwner] = useOwner();

  //   Booking
  const handleBooking = () => {
    if (!user) {
      Swal.fire({
        title: "Please Login to booking the apartment",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <>
      <div className=" max-w-[200vh] md:flex gap-4 lg:mx-auto mx-4 mt-8">
        <div className="w-1/5 ">
          <div className="sticky top-[7rem]">
            <div className="md:flex items-center w-full">
              <input
                onChange={(e) => setsearchText(e.target.value)}
                onKeyDown={handleKeyPress}
                type="text"
                className="w-full border text-black p-2 lg:p-3 rounded-l-md focus:outline-none"
                placeholder="Search House"
              />

              <button
                onClick={handleSearchText}
                type="submit"
                className="bg-indigo-600 text-white  px-4 py-2 lg:px-5 lg:py-3 rounded-r-md hover:opacity-90"
              >
                Search
              </button>
            </div>
            <div className=" md:block flex justify-between items-center ">
              <div className="lg:py-0 py-2 my-2  ">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="select select-success w-full max-w-xs"
                >
                  <option value="" disabled>
                    Choose City
                  </option>
                  <option value="Pabna">Pabna</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Chittagong">Chittagong</option>
                </select>
              </div>
              <div className="lg:py-0 py-2 my-2 ">
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="select select-success w-full max-w-xs"
                >
                  <option disabled value="">
                    Select Bedrooms
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="lg:py-0 py-2 my-2 ">
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="select select-success w-full max-w-xs"
                >
                  <option disabled value="">
                    Select Bathroom
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="lg:py-0 py-2 my-2 ">
                <select
                  value={roomSize}
                  onChange={(e) => setRoomSize(e.target.value)}
                  className="select select-success w-full max-w-xs"
                >
                  <option disabled value="">
                    Select Room Size
                  </option>
                  <option value="400 sq ft">400 sq ft</option>
                  <option value="500 sq ft">500 sq ft</option>
                  <option value="600 sq ft">600 sq ft</option>
                  <option value="700 sq ft">700 sq ft</option>
                  <option value="800 sq ft">800 sq ft</option>
                  <option value="900 sq ft">900 sq ft</option>
                  <option value="1000 sq ft">1000 sq ft</option>
                </select>
              </div>
              <div className="lg:py-0 py-2 my-2 ">
                <input
                  type="date"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="select select-success w-full max-w-xs"
                ></input>
              </div>
              <div>
                <p className="text-xl font-semibold">
                  ${maxRent ? maxRent : "0"}
                </p>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={maxRent}
                  onChange={(e) => setMaxRent(parseInt(e.target.value))}
                  className="range range-success"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/5">
          <div className="grid gap-2 mx-auto mb-8 lg:grid-cols-3 sm:grid-cols-1">
            {houses.map((house) => (
              <div key={house._id}>
                <div className="">
                  <div className="card-container">
                    <div className="card">
                      <div className="img-content">
                        <img
                          src={house.picture}
                          alt="house cover"
                          className="object-cover w-full "
                          style={{ height: "470px" }}
                        />
                      </div>
                      <div className=" h-full px-6 py-4 bg-opacity-80 opacity-0 hover:opacity-100 text-white  text-center absolute inset-0 transition-opacity duration-200 flex flex-col gap-1">
                        <p className="font-bold text-3xl mt-2 ">
                          {house.house_name}
                        </p>
                        <p className="text-lg">
                          Address: {house.address} in {house.city}
                        </p>

                        <div className="flex gap-1 justify-center text-center">
                          <p className="w-full p-2 bg-green-500 bg-opacity-60 rounded-lg">
                            Bedrooms:
                            <span className="font-semibold">
                              {house.bedrooms}
                            </span>
                          </p>
                          <p className="w-full  p-2 bg-green-500 bg-opacity-60 rounded-lg">
                            Bathrooms:
                            <span className="font-semibold">
                              {house.bathrooms}
                            </span>
                          </p>
                        </div>
                        <p className=" p-2 bg-green-500 bg-opacity-60 rounded-lg">
                          Room Size:
                          <span className="font-semibold">
                            {house.room_size}
                          </span>
                        </p>
                        <p className=" p-2 bg-green-500 bg-opacity-60 rounded-lg">
                          Availability Date:
                          <span className="font-semibold">
                            {house.availability_date}
                          </span>
                        </p>
                        <p className=" p-2 bg-green-500 bg-opacity-60 rounded-lg">
                          Phone Number:
                          <span className="font-semibold">
                            {house.phone_number}
                          </span>
                        </p>

                        <p className=" p-4   bg-green-500 bg-opacity-60 rounded-lg">
                          Description:
                          <span className="font-semibold">
                            {house.description}
                          </span>
                        </p>

                        <p className=" p-2 bg-green-500 bg-opacity-60 rounded-lg">
                          Rent per month:
                          <span className="font-semibold text-xl">
                            ${house.rent_per_month}
                          </span>
                        </p>
                        <Link to={user && `/booking/${house._id}`}>
                          <button
                            onClick={handleBooking}
                            disabled={isOwner || booking?.length >= 2}
                            className="btn bg-yellow-500 border-0 bottom-5 w-2/4  "
                          >
                            Book House
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="text-center mb-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                className={`bg-slate-800 px-3 py-1  mx-2 rounded-md font-semibold text-md text-white ${
                  page == currentPage ? "bg-yellow-600" : ""
                }`}
                key={page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Houses;
