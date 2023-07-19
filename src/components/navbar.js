import React, { useEffect, useState } from 'react'
import { logout } from '../config/auth'
import { auth } from '../config/auth'
import { useSelector } from 'react-redux'
import {GiFarmer} from 'react-icons/gi'

function Navbr() {

    const userType = useSelector(state => state.userType)
    const userInfo = {
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(userInfo))
        window.addEventListener('click', function (e) {
            var userdropdown = document.getElementById('userdropdown')
            var profileImg = document.getElementById('profileImg')
            if (e.target !== userdropdown && e.target !== profileImg) {
                userdropdown.classList.add('hidden')
            }
        })
    }, [])

    function dropdownSwitch() {
        var userdropdown = document.getElementById('userdropdown')
        userdropdown.classList.toggle('hidden')
    }

    return (
        <div className='bg-white border-b fixed border-gray-200 z-30 w-full m-auto'>
            <div className='flex flex-row px-3 py-3 justify-between'>
                <div className='flex flex-row'>
                    <div>
                        <span className='flex ml-5 items-center justify-center text-2xl font-bold text-blck gap-2'> <GiFarmer /> AgriMart </span>
                    </div>
                </div>
                <div className='flex w-2/5'>
                    <input className='ml-5 w-[80%] mt-1 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type='text' placeholder='Search' />
                </div>
                <div>
                    <img id='profileImg' className='w-10 h-10 rounded-full' src={userInfo.photoURL} alt='profile' onClick={() => { dropdownSwitch() }} />
                    <div id='userdropdown' className='fixed hidden flex-col min-w-[12rem] bg-white shadow-md right-2 gap-3' >
                        <div className='flex flex-col py-2 px-3 shadow-sm'>
                            <span className='text-black text-base'> {userInfo.name} </span>
                            <span className='text-black text-sm font-semibold'> {userInfo.email} </span>
                            <span className='text-black text-sm font-semibold'> {userType} </span>
                        </div>
                        <ul className='flex flex-col'>
                            <li className='text-black text-base px-3 py-2 hover:bg-gray-100'>Profile</li>
                            <li className='text-black text-base px-3 py-2 hover:bg-gray-100'>Dashboard</li>
                            <li className='text-black text-base px-3 py-2 hover:bg-gray-100'>Settings</li>
                            <li className='text-black text-base px-3 py-2 hover:bg-gray-100' onClick={() => { logout() }}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbr