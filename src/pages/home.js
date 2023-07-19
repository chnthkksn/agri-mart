import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { db } from '../config/auth'
import { collection, getDocs } from 'firebase/firestore'
import { addAds, clearAds } from '../redux/reducers/adsReducer'
import { useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { Modal } from 'antd'
import { FaLocationArrow, FaPhone } from 'react-icons/fa'

function Home() {
  const dispatch = useDispatch()
  const userType = useSelector(state => state.userType)
  const ads = useSelector(state => state.ads)
  const [searched, setSearched] = useState([])
  const [dbName, setDbName] = useState('retailer-ads')
  
  useEffect(() => {
    console.log(ads)
    setSearched(ads)
  }, [ads])

  function filterAds(location) {
    const filtered = Object.values(ads).filter((ad) => {
      return ad.location.toLowerCase().includes(location.toLowerCase())
    })
    setSearched(filtered)
  }

  useEffect(() => {
    if (userType === 'farmer') {

      const dbNames = ['retailer-ads', 'farmer-ads']
      for (const dbName of dbNames) {
        const collectionRef = collection(db, dbName)
        dispatch(clearAds())
        getDocs(collectionRef).then((snapshot) => {
          snapshot.forEach((doc) => {
            dispatch(addAds({
              id: doc.id,
              data: doc.data()
            }))
          })
        }).catch((error) => {
          console.log(error)
        })
      }

      return

    } else if (userType === 'retailer') {
      setDbName('farmer-ads')
    } else {
      setDbName('retailer-ads')
    }

    const collectionRef = collection(db, dbName)
    dispatch(clearAds())
    getDocs(collectionRef).then((snapshot) => {
      snapshot.forEach((doc) => {
        dispatch(addAds({
          id: doc.id,
          data: doc.data()
        }))
      })
    }
    ).catch((error) => {
      console.log(error)
    }
    )
  }, [userType])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const showModal = (ad) => {
    setModalData(ad)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex flex-col bg-white w-full h-full rounded-lg p-2 gap-2'>
      <div className='flex w-full bg-gray-50 rounded-lg p-2 gap-5 h-fit justify-between'>
        <label className='flex items-center font-bold'> Filters </label>
        <div className='flex flex-row gap-2'>
          <label className='flex justify-center items-center gap-2'> Price </label>
          <div className='flex flex-row gap-2'>
            <input className='w-20 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent' type='text' placeholder='Min' />
            <label className='flex justify-center items-center gap-2'> - </label>
            <input className='w-20 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent' type='text' placeholder='Max' />
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          <label className='flex justify-center items-center gap-2'> Quantity </label>
          <div className='flex flex-row gap-2'>
            <input className='w-20 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent' type='text' placeholder='Min KG' />
            <label className='flex justify-center items-center gap-2'> - </label>
            <input className='w-20 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent' type='text' placeholder='Max KG' />
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          <label className='flex justify-center items-center gap-2'> Location </label>
          <input onChange={(e) => filterAds(e.target.value)} className='w-30 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent' type='text' placeholder='Location' />
        </div>
        <div className='flex flex-row'>
          <button className='flex justify-center items-center px-2 py-1 rounded-md bg-green-500 text-white hover:bg-green-600'> Apply </button>
        </div>
      </div>
      <div className='flex flex-row bg-gray-50 w-full rounded-md mt-2 gap-2'>
        <div className='p-2 flex gap-2 w-full justify-start items-start'>
          {
            searched && Object.values(searched).map((ad) => {
              return (
                <div onClick={() => { showModal(ad) }} className='flex  gap-2 relative flex-col rounded-md h-60 justify-center items-center w-1/6 p-3 bg-white hover:ring-2'>
                  <p className='text-xl'> {ad.title} </p>
                  <img src={ad.image} alt='ad' className='object-contain h-40 rounded-md' />
                  <p className='flex items-center justify-center gap-2'> <CiLocationOn /> {ad.location} </p>
                </div>
              )
            })
          }
          <Modal okButtonProps={{ style: { color: 'black', backgroundColor: 'lightgray' } }} title={modalData.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className='flex flex-col gap-2 items-center'>
              <img src={modalData.image} alt='adimage' className='flex h-52  w-52' />
              <p className='flex flex-row justify-center items-center gap-2 font-bold'> {modalData.price} </p>
              <p>{modalData.description}</p>
              <p className='flex flex-row justify-center items-center gap-2'> <FaPhone /> {modalData.contact}</p>
              <p className='flex flex-row justify-center items-center gap-2'> <FaLocationArrow /> {modalData.location}</p>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Home