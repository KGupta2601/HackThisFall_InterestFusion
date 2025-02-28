import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";
const NavBar2 = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      // Error handling logic
    }
  };
  const handleCopyProfileURL = async () => {
    try {
      const url = await axios.get(BASE_URL + "/generate_public_url", {
        withCredentials: true,
      });
      if (url.data.status == 1) {
        navigator.clipboard.writeText(url.data.data.url);
      }
    } catch (err) {
      // Error handling logic
    }
  };

  return (
    <div className="navbar bg-base-300 px-4 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👩‍💻 InterestFusion
        </Link>
      </div>
      <div className="flex-none gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="hidden sm:block font-medium">
              Welcome, {user.firstName}
            </span>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="user photo" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <a onClick={handleCopyProfileURL}>Copy Profile URL</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar2;
