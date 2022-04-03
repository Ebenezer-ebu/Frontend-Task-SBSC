import Form from "./Form";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = (props) => {
  const { user, setUser, setOpen, users } = props;
  return (
    <div className="modal">
      <div className="modal-container">
        <FontAwesomeIcon
          icon={faXmark}
          className="close-modal"
          onClick={() => setOpen(false)}
        />
        <Form user={user} setUser={setUser} users={users} className="form" />
      </div>
    </div>
  );
};

export default Modal;
