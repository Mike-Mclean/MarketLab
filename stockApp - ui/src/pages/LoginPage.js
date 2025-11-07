import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const LOGIN_URL = '/login'

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

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
      const accessToken = data?.accessToken;
      setAuth({ user, accessToken});
      setUser('');
      setPwd('');
      navigate('/')

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
  };

  return (
    <section className="h-screen bg-gradient-to-b from-sky-400 to-orange-300 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
            alt="MarketLab"
            src="/chemistry-flask-icon.webp"
            className="mx-auto h-20 w-auto"
          />
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Log In</h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="block text-sm/6 font-medium text-black-100">
            Username:
          </label>

          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            value={user}
            className="block w-full rounded-md bg-white/50 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
          />

          <label htmlFor="password" className="block text-sm/6 font-medium text-black-100">
            Password:
          </label>

          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            required
            value={pwd}
            className="block w-full rounded-md bg-white/50 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
          />

          <br/>

          <button className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
            Log In
          </button>

        </form>

        <div className="text-center">
          <p className="mt-10 text-xl/9 font-bold tracking-tight text-black">
            Need an account?
            <br/>
            <a href='/register' className="font-semibold text-red-500 hover:text-red-400">
              Sign up
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}

export default LoginPage;