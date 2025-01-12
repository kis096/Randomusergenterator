import React, { useState, useEffect } from "react";
import { useGetUsersQuery } from "../services/users";
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";
import "./Usercomp.css";

const UserComp = () => {
  const [users, setUsers] = useState([]);
  const defaultImage = "https://via.placeholder.com/150";
  const { data, isLoading, refetch } = useGetUsersQuery();

  useEffect(() => {
    if (data?.results) {
      const newUsers = data.results.slice(0, 3).map((randomPerson) => {
        const { phone, email } = randomPerson;
        const { large: image } = randomPerson.picture;
        const { password } = randomPerson.login;
        const { first, last } = randomPerson.name;
        const { dob: { age } } = randomPerson;
        const { street: { number, name: streetName } } = randomPerson.location;

        return {
          phone,
          email,
          image,
          password,
          age,
          address: `${number} ${streetName}`,
          fullName: `${first} ${last}`,
        };
      });
      setUsers(newUsers);
    }
  }, [data]);

  return (
    <div className="user-comp">
      <h2 className="title">User Information</h2>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="user-cards-container">
          {users.map((user, index) => (
            <div className="card" key={index}>
              <img
                src={user.image || defaultImage}
                alt={user.fullName}
                className="profile-img"
              />
              <h3 className="name">
                <FaUser /> {user.fullName}
              </h3>
              <p className="info">
                <FaPhone /> {user.phone}
              </p>
              <p className="info">
                <FaEnvelope /> {user.email}
              </p>
              <p className="info">
                <FaMapMarkerAlt /> {user.address}
              </p>
              <p className="info">
                <FaUser /> Age: {user.age}
              </p>
              <p className="info">
                <FaLock /> Password: {user.password}
              </p>
            </div>
          ))}
        </div>
      )}
      <button className="refetch-button" onClick={refetch}>
        Refetch Users
      </button>
    </div>
  );
};

export default UserComp;
