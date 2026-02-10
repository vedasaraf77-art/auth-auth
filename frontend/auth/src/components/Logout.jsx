import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authThunks";

function Logout() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <h2>Logout</h2>

      <button onClick={() => dispatch(logout())}>Logout</button>

      {/* <hr />

      <h3>Redux Auth State:</h3>
      <pre>{JSON.stringify(auth, null, 2)}</pre> */}
    </div>
  );
}

export default Logout;
