import { useState } from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo_url = form.photo_url.value;
    const email = form.email.value;
    const password = form.password.value;
    const userInfo = { name, email, password, photo_url };

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful!");
        setError("");
        // You can redirect to the login page or handle success as needed
      } else {
        setError(data.message || "Registration failed");
        setSuccess("");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Internal server error");
      setSuccess("");
    }
  };

  return (
    <div
      className="bg-[center_top_-1rem]   bg-cover bg-opacity-75 
      flex items-center justify-center min-h-screen "
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/cerulean-blue-curve-frame-template_53876-99029.jpg?w=996&t=st=1684848119~exp=1684848719~hmac=a99cbc77defc36a7323f8f88bf91ef052f1500743b521c914610ae4c6a9062d4")',
      }}
    >
      <div>
        <div className="container">
          <div className="heading">Sign Up</div>
          <form onSubmit={handleSubmit} className="form">
            <input
              required
              className="input"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
            />
            <input
              required
              className="input"
              name="photo_url"
              type="text"
              id="photo_url"
              placeholder="Enter your PhotoURL Link"
            />
            <input
              required
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
            />
            <input
              required
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <div>
              <p className="text-center ">{error}</p>
              <p className="text-center ">{success}</p>
            </div>
            <input
              className="login-button btn-secondary"
              type="submit"
              value="Sign Up"
            />
          </form>
          <div className="social-account-container">
            <span className="title">Or Sign in with</span>
            <div className="social-accounts">
              {/* Add social account buttons as needed */}
            </div>
          </div>
          <span className="agreement">
            <Link to="/login">
              <p className="text-sm">Already Have An Account? Login Here</p>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Registration;
