import React, { useEffect, useState } from 'react'
import { MdDashboardCustomize, MdBarChart, MdUnfoldMoreDouble, MdWallet, MdOutlineStar, MdSettings, MdHelpCenter, MdOutlineNavigateNext } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setType } from '../redux/reducers/userReducer'

const Sidebar = ({ children }) => {

    const dispatch = useDispatch()
    const userType = useSelector(state => state.userType)
    const switcher = () => {
        const switcherBtn = document.getElementById('switcher')
        switcherBtn.classList.toggle('hidden')
    }
    

    const [navList, setNavList] = useState([])

    useEffect(() => {
        if (userType === 'customer') {
            setNavList(
                [
                    ['Dashboard', <MdDashboardCustomize className='w-6 h-6' />, '/dashboard'],
                    ['Transactions', <MdUnfoldMoreDouble className='w-6 h-6' />, '/transactions'],
                    ['Wallet', <MdWallet className='w-6 h-6' />, '/wallets'],
                    ['Favorites', <MdOutlineStar className='w-6 h-6' />, '/favorites'],
                ]
            )
        } else {
            setNavList(
                [
                    ['Dashboard', <MdDashboardCustomize className='w-6 h-6' />, '/dashboard'],
                    ['My Ads', <MdBarChart className='w-6 h-6' />, '/myads'],
                    ['Transactions', <MdUnfoldMoreDouble className='w-6 h-6' />, '/transactions'],
                    ['Wallet', <MdWallet className='w-6 h-6' />, '/wallets'],
                    ['Favorites', <MdOutlineStar className='w-6 h-6' />, '/favorites'],
                ]
            )
        }
    }, [userType])

    return (
        <div className='flex flex-row pt-16 h-screen'>
            <div className='flex flex-shrink-0 w-64'>
                <div className='relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0'>
                    <div className='flex-1 justify-between flex flex-col pt-5 pb-4 gap-2 space-y-1 px-3'>
                        <div>
                            <ul className='space-y-2 pb-2 border-b border-gray-200'>
                                {navList.map(([name, icon, link]) => (
                                    <li> <Link to={link} className='flex mx-2 px-2 py-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 items-center gap-2 text-base p-2 font-inter' > {icon} {name} </Link></li>
                                ))}
                            </ul>
                            <ul className='space-y-2 pb-2'>
                                {[
                                    ['Settings', <MdSettings className='w-6 h-6' />, '/settings'],
                                    ['Premium', <MdOutlineStar className='w-6 h-6' />, '/premium'],
                                    ['Support', <MdHelpCenter className='w-6 h-6' />, '/support'],
                                ].map(([name, icon, link]) => (
                                    <li> <Link to={link} className='flex mx-2 px-2 py-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 items-center gap-2 text-base p-2 font-inter' > {icon} {name} </Link></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <ul className='bg-gray-800 mx-2 px-2 py-2 rounded-lg hidden' id='switcher'>
                                <li className='flex px-2 py-2 text-gray-100 hover:text-gray-900 rounded-lg hover:bg-gray-100 items-center gap-2 text-base p-2 font-inter hover:cursor-pointer' onClick={() => { dispatch(setType('customer')); switcher() }}> Consumer </li>
                                <li className='flex px-2 py-2 text-gray-100 hover:text-gray-900 rounded-lg hover:bg-gray-100 items-center gap-2 text-base p-2 font-inter hover:cursor-pointer' onClick={() => { dispatch(setType('retailer')); switcher() }}> Retaler </li>
                                <li className='flex px-2 py-2 text-gray-100 hover:text-gray-900 rounded-lg hover:bg-gray-100 items-center gap-2 text-base p-2 font-inter hover:cursor-pointer' onClick={() => { dispatch(setType('farmer')); switcher() }}> Farmer </li>
                            </ul>
                            <p className='flex justify-between w-full mx-2 px-2 py-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-200 items-center gap-2 text-base p-2 font-inter'
                                onClick={() => { switcher() }}>
                                Switch To <p className='flex pr-2 bg-gray-50 p-1 px-2 rounded-md justify-center items-center hover:font-bold transition-all hover:text-green-500 text-gray-500'> {userType === 'farmer' ? "Farmer" : userType === 'retailer' ? "Retailer" : "Consumer"} <MdOutlineNavigateNext/> </p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-screen m-4'>
                {children}
            </div>
        </div>
    )
}

export default Sidebar