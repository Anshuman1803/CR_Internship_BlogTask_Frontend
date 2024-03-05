import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
function Profile() {
  const { currentUser } = useSelector((state) => state.BlogApp);
  const navigateTO = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userDetails, setUser] = useState(null);
  const [totalLikes] = useState(0);
  const [totalPosts] = useState(0);
  const [totalComments] = useState(0);

  useEffect(() => {
    // axios
    //   .get(`https://cr-internship-blogtask-backend.onrender.com/api/user/${currentUser._id}`)
    //   .then((response) => {
    //     setUser(response.data);
    //     axios
    //       .get(`https://cr-internship-blogtask-backend.onrender.com/api/user/blog/${response.data.userEmail}`)
    //       .then((response2) => {
    //         console.log(response2.data);
    //       });
    //   });
    setLoading(true);
    axios
      .all([
        axios.get(
          `https://cr-internship-blogtask-backend.onrender.com/api/user/${currentUser._id}`
        ),
        axios.get(
          `https://cr-internship-blogtask-backend.onrender.com/api/user/blog/${currentUser.userEmail}`
        ),
      ])
      .then(
        axios.spread((userResponse, blogResponse) => {
          setLoading(false);
          setUser(userResponse.data);
          console.log(blogResponse.data);
        })
      )
      .catch((error) => {
        // Handle error
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
              <button className="inforContainer__deleteButton">
                Delete Account
              </button>
            </div>
          </div>

          <div className="ProfileSection__cardContainer">
            <div className="ProfileSection__cards">
              <h3 className="ProfileSectionCards__title">Total Posts</h3>
              <span className="ProfileSectionCards__Number">{totalLikes}</span>
            </div>

            <div className="ProfileSection__cards">
              <h3 className="ProfileSectionCards__title">Total Likes</h3>
              <span className="ProfileSectionCards__Number">{totalPosts}</span>
            </div>

            <div className="ProfileSection__cards">
              <h3 className="ProfileSectionCards__title">Total Comment</h3>
              <span className="ProfileSectionCards__Number">
                {totalComments}
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Profile;
