import React, { useState } from "react";
import { faUser, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateUser } from "../utils/api";

const Form = (props) => {
  const [detail, setDetails] = useState({
    name: "",
    job: "",
  });
  const { id } = props.user;
  const { setUser } = props;

  const inputEvent = (e) => {
    const { value, name } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateUser(detail, id);
    if (props.users) {
      const { users } = props;
      const userUpdate = users.map((user) => {
        if (user.id === id) {
          user.first_name = res.name;
          user.job = res.job;
        }
        return user;
      });
      setUser(userUpdate);
    } else {
      setUser((prev) => ({ ...prev, first_name: res.name, job: res.job }));
    }
    setDetails({ name: "", job: "" });
  };
  return (
    <div className="form-content">
      <form onSubmit={handleSubmit}>
        <h3>Update Account</h3>
        <div className="input-text">
          <input
            type="text"
            placeholder="Name"
            value={detail.name}
            onChange={inputEvent}
            name="name"
          />
          <FontAwesomeIcon icon={faUser} className="fa fa-envelope" />
        </div>
        <div className="input-text">
          <input
            type="text"
            placeholder="Add job name"
            value={detail.job}
            onChange={inputEvent}
            name="job"
          />
          <FontAwesomeIcon icon={faBriefcase} className="fa fa-lock" />
        </div>
        <div className="buttons">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
