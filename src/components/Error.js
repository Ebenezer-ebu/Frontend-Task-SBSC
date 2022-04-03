import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const Error = (props) => {
  const { message } = props.error;
  return (
    <div className="error">
      <FontAwesomeIcon icon={faExclamationTriangle} />
      {message}
    </div>
  );
};

export default Error;
