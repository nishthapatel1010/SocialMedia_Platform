import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpeg";
import Profile from "../../img/profile.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCard = ({ location }) => {
  // Use useSelector unconditionally
  const { authData } = useSelector((state) => state.authReducer);
  const user = authData ? authData.user : null;
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // State to manage loading state
  const [loading, setLoading] = useState(true);

  // Set loading to false when user data is available
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  // If still loading, display loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt="CoverImage"
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          {/* For profile page */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
