import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/user_api/register'

const RegisterPage = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [ errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user, pwd})
      });
      const data = await response.json()
      console.log(data)
      // clear input fields
    } catch (err) {
      if(!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 409){
        setErrMsg('Username Taken')
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus()
    }
  }


  return (
    <section className="h-screen bg-gradient-to-b from-red-400 to-orange-300 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
            alt="MarketLab"
            src="/chemistry-flask-icon.webp"
            className="mx-auto h-20 w-auto"
          />
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Register</h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="block text-sm/6 font-medium text-black-100">
            Username:
            {(user && validName) && (<FontAwesomeIcon icon={faCheck} />)}
            {(user && !validName) && (<FontAwesomeIcon icon={faTimes} />)}
          </label>

          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="block w-full rounded-md bg-white/50 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
          />

          {(user && !validName) && (
            <div>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.<br/>
              Must begin with a letter. <br/>
              Letters, number, underscores, hyphens allowed.
            </div>)}

          <label htmlFor="password" className="block text-sm/6 font-medium text-black-100">
            Password:
            {(pwd && validPwd) && (<FontAwesomeIcon icon={faCheck} />)}
            {(pwd && !validPwd) && (<FontAwesomeIcon icon={faTimes} />)}
          </label>

          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="block w-full rounded-md bg-white/50 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
          />

          {(pwd && !validPwd) && (
            <div>
            <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br/>
              Must inlcude uppercase and lowercase letters, a number and a special character. <br/>
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
            </div>
            )}

          <label htmlFor="confirm_pwd" className="block text-sm/6 font-medium text-black-100">
            Confirm Password:
            {(matchPwd && validMatch) && (<FontAwesomeIcon icon={faCheck} />)}
            {(matchPwd && !validMatch) && (<FontAwesomeIcon icon={faTimes} />)}
          </label>

          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className="block w-full rounded-md bg-white/50 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
          />

          {(matchPwd && !validMatch) && (
            <div>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </div>
          )}

          <br/>
            <button disabled={!validName || !validPwd || !validMatch ? true : false}
                    className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              Sign Up
            </button>

        </form>
      </div>

      <div className="text-center">
        <p className="mt-10 text-xl/9 font-bold tracking-tight text-black">
          Already have an account?
        </p>
        {/*add router link*/}
        <a href='/login' className="font-semibold text-red-500 hover:text-red-400">
          Sign In
        </a>
      </div>


    </section>
  )
}

export default RegisterPage;