import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authThunks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated]);

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <hr />

      <h3>Redux Auth State:</h3>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  );
}

export default Login;
