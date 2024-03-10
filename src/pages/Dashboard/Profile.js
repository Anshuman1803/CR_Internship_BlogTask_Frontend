import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { UserLoggedOut } from "../../Redux/ReduxSlice";
function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.BlogApp);
  const navigateTO = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userDetails, setUser] = useState(null);

  const handleDeleteAccountClick = (e, email) => {
    e.preventDefault();
    setLoading(true)
    axios
      .post(`https://cr-internship-blogtask-backend.onrender.com/api/user/deleteuser/${email}`)
      .then((response) => {
        setLoading(false)
        if (response.data.success) {
          toast.error("Account deleted successfully");
        dispatch( UserLoggedOut(false))
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error("Something went wrong! Try again");
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://cr-internship-blogtask-backend.onrender.com/api/user/${currentUser._id}`
      )
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentUser]);
  return (
    <section className="Dashboard__section DashboardSection__profile">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <button
            className="profileSection__navigateButton"
            onClick={() => navigateTO("/")}
          >
            Go Home
          </button>
          <div className="ProfileSection__infoContainer">
            <p className="infoContainer__userInitials">
              {userDetails?.userName[0]}
            </p>

            <div className="infoContainer__infoRows">
              <span className="infoContainer__infoLabel">Full Name</span>
              <span className="infoContainer__info">
                {userDetails?.userName}
              </span>
            </div>

            <div className="infoContainer__infoRows">
              <span className="infoContainer__infoLabel">Email address</span>
              <span className="infoContainer__info">
                {userDetails?.userEmail}
              </span>
            </div>

            <div className="infoContainer__infoRows">
              <span className="infoContainer__infoLabel">Phone number</span>
              <span className="infoContainer__info">
                {userDetails?.userPhone}
              </span>
            </div>

            <div className="infoContainer__infoRows">
              <button
                className="inforContainer__deleteButton"
                onClick={(e) =>
                  handleDeleteAccountClick(e, userDetails?.userEmail)
                }
              >
                Delete Account
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Profile;
