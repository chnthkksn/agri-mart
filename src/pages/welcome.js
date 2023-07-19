import React, { useEffect, useState } from 'react'
import { auth, googleProvider } from '../config/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import LoadingButton from '@mui/lab/LoadingButton';

function Welcome() {

    const imgs = [
        require('../data/img/index.jpg'),
        require('../data/img/index5.jpg'),
        require('../data/img/index4.jpg'),
        require('../data/img/index3.jpg'),
        require('../data/img/index2.jpg'),
    ]
    const x = Math.floor((Math.random() * imgs.length));
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [login, setLogin] = useState(true)
    const [loginProcess, setLoginProcess] = useState(false)
    const [registerProcess, setRegisterProcess] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false)
                navigate('/dashboard')
            }
            else {
                setLoading(false)
            }
        })
    }, [navigate])

    async function googleLogin() {
        await signInWithPopup(auth, googleProvider).then((result) => {
            navigate('/dashboard')
        }
        ).catch((error) => {
            console.log(error)
        }
        )
    }

    async function register() {
        setRegisterProcess(true)
        var email = document.getElementById('up-email').value
        var password = document.getElementById('up-password').value
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            if (userCredential) {
                setRegisterProcess(false)
            }
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setRegisterProcess(false)
        });
    }

    async function signin() {
        var email = document.getElementById('login-email').value
        var password = document.getElementById('login-password').value
        if (email === '' || password === '') {
            alert('Please fill all the fields')
            return
        }
        setLoginProcess(true)
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            if (userCredential) {
                console.log('User Logged In')
            }
            else {
                setLoginProcess(false)
            }
        }).catch((error) => {
            setLoginProcess(false)
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    const passValidation = () => {
        const pass = document.getElementById('up-password').value
        const passConf = document.getElementById('up-password-conf').value
        const warn = document.getElementById('passwordWarn')
        const btn = document.querySelector('button')
        var passRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (!passRegEx.test(pass)) {
            warn.textContent = 'Password must contain at least one number and one special character, and at least 6 or more characters'
            warn.classList.remove('hidden')
            btn.classList.add('cursor-not-allowed')
        }
        else {
            if (pass !== passConf) {
                warn.textContent = 'Password does not match'
                warn.classList.remove('hidden')
                btn.classList.add('cursor-not-allowed')
                btn.disabled = true
            } else {
                warn.classList.add('hidden')
                btn.classList.remove('cursor-not-allowed')
                btn.disabled = false
            }
        }
    }

    const emailValidation = () => {
        var emailWarn = document.getElementById('emailWarn')

        var email = document.getElementById('up-email').value
        var emailRegEx = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
        if (!emailRegEx.test(email)) {
            emailWarn.classList.remove('hidden')
        }
        else {
            emailWarn.classList.add('hidden')
        }
    }

    return (
        loading ?
            <div className='flex justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
            </div>
            :
            <div className='flex h-screen w-screen bg-gray-50'>
                <div className='flex w-1/2 md:w-full justify-center items-center'>
                    <div className='flex  flex-col gap-3 w-1/2 md:w-3/4'>
                        <h1 className='text-4xl font-bold text-center'>Welcome</h1>
                        {
                            login ? (
                                <div className='flex flex-col bg-white p-5 rounded-md gap-3 shadow-md'>
                                    <h2 className='text-2xl'>Log In </h2>
                                    <input type='text' placeholder='Email' className='border-2 border-gray-200 rounded-md p-2' id='login-email' />
                                    <input type='password' placeholder='Password' className='border-2 border-gray-200 rounded-md p-2' id='login-password' />
                                    <span className='text-red-500 hidden text-xs' id='loginWarn'>Username or Password is incorrect</span>

                                    <LoadingButton onClick={() => signin()} variant="contained" loading={loginProcess}
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Login</LoadingButton>
                                    <LoadingButton variant="outlined" onClick={() => { googleLogin() }}
                                        className='bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex flex-row items-center  justify-center gap-2' > Sign with Google <FcGoogle /> </LoadingButton>
                                    <button> Forgot Password ? </button>
                                    <button onClick={() => setLogin(false)} className=''> Register Now ! </button>
                                </div>
                            )
                                :
                                (
                                    <div className='flex flex-col bg-white p-5 rounded-md gap-3 shadow-md'>
                                        <h2 className='text-2xl'> Register </h2>
                                        <input type='text' placeholder='Username' className='border-2 border-gray-200 rounded-md p-2' id='up-username' />
                                        <input type='email' placeholder='Email' className='border-2 border-gray-200 rounded-md p-2' id='up-email' onChange={() => emailValidation()} />
                                        <span className='text-red-500 hidden text-xs' id='emailWarn'> Email format is invalid ! </span>
                                        <input type='password' placeholder='Password' className='border-2 border-gray-200 rounded-md p-2' id='up-password' onChange={() => passValidation()} />
                                        <input type='password' placeholder='Password confirm' className='border-2 border-gray-200 rounded-md p-2' id='up-password-conf' onChange={() => passValidation()} />
                                        <span className='text-red-500 hidden text-xs' id='passwordWarn'>Passwords do not match !</span>
                                        <LoadingButton onClick={() => register()} variant="contained" loading={registerProcess}
                                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Register </LoadingButton>
                                        <LoadingButton variant="outlined" onClick={() => { googleLogin() }}
                                            className='bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded flex flex-row items-center  justify-center gap-2' > Sign up Google <FcGoogle /> </LoadingButton>
                                        <button onClick={() => setLogin(true)} className=''> Login here ! </button>
                                    </div>
                                )
                        }
                    </div>
                </div>
                <div className='flex w-1/2 md:hidden'>
                    <img src={imgs[x]}
                        alt='welcome'
                        className='object-cover w-full h-full'
                    />
                </div>
            </div>
    )
}

export default Welcome