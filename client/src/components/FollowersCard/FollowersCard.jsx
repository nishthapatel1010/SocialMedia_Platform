import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  
  // Safe check for user
  const user = useSelector((state) => state.authReducer?.authData?.user);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  // If user is not available, return loading or some fallback UI
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>

      {/* Map over persons and render User component */}
      {persons.map((person, id) => {
        // Check if person is not the logged-in user
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
        return null; // Ensure null is returned when user is the same
      })}

      {/* Show 'Show more' button if no location is passed */}
      {!location && (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      )}

      {/* Render the FollowersModal */}
      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;
