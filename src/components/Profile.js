const Profile = (props) => {
  const { avatar, email, first_name, last_name } = props.user;
  return (
    <div className="card-image">
      <div className="content">
        <img src={avatar} />
        <p>
          {first_name} {last_name}
        </p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Profile;
