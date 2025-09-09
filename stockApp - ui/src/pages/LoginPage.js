import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";

const LOGIN_URL = '/auth'

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [ user, setUser] = useState('');
  const [ pwd, setPwd] = useState('');
  const [ errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          user,
          pwd
        })
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }
    const data = await response.json()
    console.log(data)
    const accessToken = data?.accessToken;
    setAuth({ user, pwd, accessToken});
    setUser('');
    setPwd('');
    } catch (err){
      if (!err?.resposne) {
        setErrMsg('No server response')
      } else if (err.response?.status === 400){
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401){
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus();
    }
  }

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>

        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          value={user}

        />

        <label htmlFor="password">Password:</label>

        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          value={pwd}
        />

        <button>Log In</button>
      </form>
      <p>
          Need an account?<br/>
          <span className="line">
            {/*add router link*/}
            <a href='/'>Sign up</a>
          </span>
        </p>
    </section>
  )
}

export default LoginPage;