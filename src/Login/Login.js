import './Login.css'
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri'
import { BiUser } from 'react-icons/bi'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserData } from '../Redux/Slices/UserdataSlice';
import { json, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Login = () => {

    //data

    const profileIcons = [{
        avtar: 'https://cdn-icons-png.flaticon.com/512/3233/3233483.png',
        gender: 'male'
    }, {
        avtar: '',
        gender: 'male'
    }, {
        avtar: '',
        gender: 'male'
    }, {
        avtar: 'https://cdn-icons-png.flaticon.com/128/3884/3884913.png',
        gender: 'female'
    }, {
        avtar: '',
        gender: 'female'
    }, {
        avtar: '',
        gender: 'female'
    }];

    function preventBack() {
        window.history.forward();
    }

    setTimeout(preventBack(), 0);

    window.onunload = function () { return null };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [displayOn, setdisplayOn] = useState(true);

    const [userNameError, setuserNameError] = useState(false);
    const [emailError, setemailError] = useState(false);
    const [passwordError, setpasswordError] = useState(false);
    const [retypePasswordError, setretypePasswordError] = useState(false);
    const [loginEmailError, setLoginEmailError] = useState(false);
    const [loginPasswordError, setLoginPasswordError] = useState(false);
    const [accountExistError, setAccountExistError] = useState(false);


    const [LoginUserData, setLoginUserData] = useState({
        loginEmail: '',
        loginPassword: ''
    })

    const [user, setUser] = useState({
        userName: "",
        avtar: "",
        gender: 'female',
        email: '',
        theme: 'light',
        status: 'online',
        connections: [],
        password: '',
        retypePassword: '',
    });

    const { loginEmail, loginPassword } = LoginUserData;
    const { userName, gender, email, password, retypePassword } = user;

    const booleanvalueHandler = (setBooleanValue, booleanValue) => {
        setBooleanValue(booleanValue)
    }

    const Login = (key) => (event) => {
        setLoginUserData({ ...LoginUserData, [key]: event.target.value })
    }

    const signUp = (key) => (event) => {
        setUser({ ...user, [key]: event.target.value });
    }

    console.log(user);

    const SubmitLoginData = (event) => {
        event.preventDefault();

        let loginemailerr = true, loginpassworderr = true;

        if (loginEmail.includes("@gmail.co") && loginEmail.length > 10)
            loginemailerr = true;
        else
            loginemailerr = false;

        if ((/\d/.test(loginPassword) && loginPassword.match(/[a-zA-Z]/g)))
            loginpassworderr = true;
        else
            loginpassworderr = false;

        if (loginemailerr && loginpassworderr) {
            setLoginEmailError(!loginemailerr);
            setLoginPasswordError(!loginpassworderr);
        }
        else {
            setLoginEmailError(!loginemailerr);
            setLoginPasswordError(!loginpassworderr);
            return null
        }


        if (localStorage.getItem('users')) {
            const users = JSON.parse(localStorage.getItem('users'));

            const userDetails = users.find((user) =>
                user.email === loginEmail && user.password === loginPassword
            );

            if (userDetails) {
                navigate('/home', { state: userDetails });
            }
            else setAccountExistError(true);

        }





    }

    const submitUserData = (event) => {
        event.preventDefault();

        const errors = {
            userNameErr: false,
            emailErr: false,
            passwordErr: false,
            retypepasswordErr: false,
        }

        let { userNameErr, emailErr, passwordErr, retypepasswordErr } = errors;

        if (isNaN(userName))
            userNameErr = true;

        else
            userNameErr = false;


        if ((email.includes("@gmail.com") && email.length > 10))
            emailErr = true
        else
            emailErr = false


        if ((/\d/.test(password) && password.match(/[a-zA-Z]/g)))
            passwordErr = true
        else
            passwordErr = false


        if ((password === retypePassword))
            retypepasswordErr = true
        else
            retypepasswordErr = false


        if ((userNameErr && emailErr && passwordErr && retypepasswordErr)) {
            setuserNameError(!userNameErr);
            setemailError(!emailErr);
            setpasswordError(!passwordErr);
            setretypePasswordError(!retypepasswordErr);
        }
        else {
            setuserNameError(!userNameErr);
            setemailError(!emailErr);
            setpasswordError(!passwordErr);
            setretypePasswordError(!retypepasswordErr);
            return null
        }

        navigateToHomepage();


    }

    const navigateToHomepage = () => {

        const userid = uuidv4();
        let lsUsers = [];
        let userDetails;

        if (user.gender === "male") {
            userDetails = { ...user, userId: userid, ['avtar']: profileIcons[0].avtar }

        }
        else if (user.gender === "female") {
            userDetails = { ...user, userId: userid, ['avtar']: profileIcons[3].avtar }
        }

        if (localStorage.getItem('users')) {
            lsUsers = JSON.parse(localStorage.getItem('users'))
        }

        const users = [...lsUsers, userDetails];

        // console.log(users,'users');

        localStorage.setItem('users', JSON.stringify(users));

        navigate('/home', { state: userDetails });

    }



    return (
        <div className="Login-container">
            <h2>Please Signin to begin chat</h2>
            <div className='Login-up-wrapper'>


                <div className="first-parent ">

                    <div className='Login-wrapper' >

                        <form onSubmit={SubmitLoginData} className={`Login ${displayOn ? null : 'd-off'}`}>
                            <h2>Sign in</h2>
                            <div className='email'>
                                <div className="icon"><HiOutlineMail /></div>
                                <input className='Login-input' type="text" placeholder='Email' autoComplete='on' required value={loginEmail} onChange={Login("loginEmail")}></input>
                            </div>
                            <div className={`hidden ${loginEmailError ? 'visible' : null}`}>Enter valid email format</div>

                            <div className='password'>
                                <div className="icon"><RiLockPasswordLine /></div>
                                <input className='Login-input' type="password" placeholder='Password' autoComplete='on' required minLength='5' value={loginPassword} onChange={
                                    Login("loginPassword")
                                }></input>
                            </div>
                            <div className={`hidden ${loginPasswordError ? "visible" : null} ${accountExistError ? "d-off" : null}`}  >Enter valid password format</div>
                            <div className={`small-red-text ${accountExistError ? "display-on" : "d-off"} `} >Incorrect Password/email</div>
                            <div></div>

                            <input className="button" type="submit" value="Sign In"></input>
                        </form>

                        <form onSubmit={submitUserData} className={`Login ${displayOn ? 'd-off' : null}`}>
                            <h2>Sign Up</h2>

                            <div className='first-name'>
                                <div className="icon"><BiUser /></div>
                                <input className='Login-input' type="text" placeholder='First name' required autoComplete='off' value={userName} maxLength='10' onChange={signUp("userName")}></input>
                            </div>
                            <div className={`hidden ${userNameError ? "visible" : null}`}>Username should characters only</div>

                            <div className='email'>
                                <div className="icon"><HiOutlineMail /></div>
                                <input className='Login-input' type="text" placeholder='Email' required autoComplete='off' value={email} onChange={signUp("email")}></input>
                            </div>
                            <div className={`hidden ${emailError ? 'visible' : null}`}>Enter a valid email format</div>

                            <div className="select-gender">
                                <input type="radio" name="select" id="option-1" value='male'  />
                                <input type="radio" name="select" id="option-2" value='female'   />
                                <label htmlFor="option-1" className="option option-1" onClick={() => { setUser({...user,gender:'male'}) }} >
                                    <div class="dot"></div>
                                    <span>Male</span>
                                </label>
                                <label htmlFor="option-2" className="option option-2"  onClick={() => { setUser({...user,gender:'female'}) }}>
                                    <div class="dot"></div>
                                    <span>Female</span>
                                </label>
                            </div>

                            <div className='password'>
                                <div className="icon"><RiLockPasswordLine /></div>
                                <input className='Login-input' type="password" placeholder='Password' required autoComplete='off' minLength='5' value={password} onChange={signUp("password")}></input>
                            </div>
                            <div className={`hidden ${passwordError ? 'visible' : null}`}>Password should contain a-z and 1-0</div>

                            <div className='password'>
                                <div className="icon"><RiLockPasswordLine /></div>
                                <input className='Login-input' type="password" placeholder='Retype password' required autoComplete='off' value={retypePassword} onChange={signUp("retypePassword")}></input>
                            </div>
                            <div className={`hidden ${retypePasswordError ? 'visible' : null}`}>Password does't match</div>
                            <input type="submit" value="Sign Up" className="button" />
                        </form>


                    </div>
                </div>

                <div className='second-parent '>
                    <div className='signout-wrapper'>
                        <div className='signout-button'>
                            <div className={`signout-text ${displayOn ? null : 'd-off'}`}>
                                <h2>Welcome Friend!</h2>
                                <p>Enter your personal details and start journey with us</p>
                                <div className='button' onClick={() => { booleanvalueHandler(setdisplayOn, !displayOn) }} >Sign Up</div>
                            </div>

                            <div className={`signout-text ${displayOn ? 'd-off' : null}`}>
                                <h2>Welcome Back</h2>
                                <p>To keep connected with us please login with your person info</p>
                                <div className='button' onClick={() => { booleanvalueHandler(setdisplayOn, !displayOn) }} >Sign In</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    );
}

export default Login;