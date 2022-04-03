import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/api";
import Form from "./Form";
import Profile from "./Profile";
import Users from "./Users";

const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [active, setActive] = useState({
    account: true,
    users: false,
  });
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [time, setTime] = useState("10:00");

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  useEffect(() => {
    let countDownTimerId = setInterval(() => {
      let min = time.split(":")[0];
      let secs = time.split(":")[1];
      if (min === "00" && secs === "00") {
        clearInterval(countDownTimerId);
        navigate("/");
      }
      if (secs === "00") {
        min = `${Number(min) - 1}`.padStart(2, "0");
        setTime(`${min}:59`);
      } else {
        secs = `${Number(secs) - 1}`.padStart(2, "0");
        setTime(`${min}:${secs}`);
      }
    }, 1000);
    return () => clearInterval(countDownTimerId);
  }, [time]);

  useEffect(() => {
    async function getUserDetails() {
      const response = await getUser();
      setUser(response.data);
    }
    getUserDetails();
    const getLocation = () => {
      //   const result = { status: null, lat: null, lng: null };
      if (!navigator.geolocation) {
        setStatus("Geolocation is not supported by your browser");
      } else {
        setStatus("Locating...");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setStatus(null);
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
          },
          () => {
            setStatus("Unable to retrieve your location");
          }
        );
      }
    };
    getLocation();
  }, []);
  return (
    <div className="user-container">
      <div className="menu">
        <ul className="tabs">
          <li
            onClick={() =>
              setActive((prev) => ({ ...prev, account: true, users: false }))
            }
          >
            Account
          </li>
          <li
            onClick={() =>
              setActive((prev) => ({ ...prev, account: false, users: true }))
            }
          >
            Users
          </li>
          <li onClick={handleLogOut}>Log Out</li>
        </ul>
      </div>
      <div className="card-container">
        <div className="top">
          <h1 className="welcome">
            {user ? `Welcome, ${user.first_name}` : null}
          </h1>
          <div>
            <h3>{time}</h3>
            <p>{status}</p>
            <p className="lat">{lat ? `Latitude: ${lat}` : null}</p>
            <p className="lng">{lng ? `Longitude: ${lng}` : null}</p>
          </div>
        </div>
        <div className="main">
          {active.account ? (
            <div className="profile">
              <Profile user={user} />
              <Form user={user} setUser={setUser} />
            </div>
          ) : (
            <div className="user-list">
              <Users />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
