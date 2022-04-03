import React, { useState, useEffect } from "react";
import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "./Profile";
import { getUsersByPage, deleteUser } from "../utils/api";
import Modal from "./Modal";

const Users = () => {
  const [users, setUser] = useState([]);
  let [page, setPage] = useState(1);
  const [open, setOpen] = useState({ set: false, id: "" });

  const handlePage = (e) => {
    const { name } = e.target;
    if (name === "prev" && page !== 1) {
      setPage(page - 1);
    } else if (name === "next") {
      setPage(page + 1);
    }
  };

  const handleOpen = (id) => {
    setOpen((prev) => ({ ...prev, set: true, id: id }));
  };

  const handleDelete = async (id) => {
    const res = await deleteUser(id);
    const newUsers = users.filter((user) => user.id !== id);
    setUser(newUsers);
  };

  useEffect(() => {
    async function getUsers() {
      const response = await getUsersByPage(page);
      setUser(response.data);
      if (response.data.length === 0) {
        setPage(page - 1);
      }
    }
    getUsers();
  }, [page]);
  return (
    <div>
      <div className="list">
        {users
          ? users.map((user) => (
              <div className="contain" key={user.id}>
                <Profile user={user} />
                <FontAwesomeIcon
                  icon={faPencil}
                  className="fa-pencil"
                  onClick={() => handleOpen(user.id)}
                />
                <FontAwesomeIcon
                  icon={faXmark}
                  className="fa-xmark"
                  onClick={() => handleDelete(user.id)}
                />
                {open.set && open.id === user.id ? (
                  <Modal
                    user={user}
                    setUser={setUser}
                    setOpen={setOpen}
                    open={open}
                    users={users}
                  />
                ) : null}
              </div>
            ))
          : null}
      </div>
      <div className="paginate">
        <button className="btn" name="prev" onClick={handlePage}>
          previous
        </button>
        <button className="btn" name="next" onClick={handlePage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
