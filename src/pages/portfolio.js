import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc, collection } from 'firebase/firestore';
import { db, storage } from '../config/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { CiLocationOn } from 'react-icons/ci';
import DeleteModal from './blocks/popupModal'

function Portfilio() {

  const navigate = useNavigate()
  const userType = useSelector((state) => state.userType)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'))
  const ads = useSelector((state) => state.ads);
  let selectedAds = {}

  for (const [key, value] of Object.entries(ads)) {
    if (value.uid === user.uid) {
      selectedAds[key] = value
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const form = document.getElementById('createAdd');
    const formData = new FormData(form);
    let data = Object.fromEntries(formData.entries());

    if (Object.values(data).includes('')) {
      alert('Please fill all the fields');
      return;
    }

    function getCollectionName(userType) {
      switch (userType) {
        case 'retailer':
          return 'retailer-ads'
          break
        case 'farmer':
          return 'farmer-ads'
          break
        default:
          return 'farmer-ads'
      }
    }

    const collectionRef = collection(db, getCollectionName(userType));
    const storageRef = ref(storage, `images/${uuidv4()}.jpg`);
    await uploadBytes(storageRef, data.image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        data.image = url;
        setDoc(doc(collectionRef), {
          ...data,
          uid: user.uid,
          type: userType
        });
      });
    });

    console.log(data);

    form.reset();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function formatCurrency() {
    var inputField = document.getElementById("priceInput");
    var currencySymbol = "LKR ";

    var value = inputField.value.replace(/[^\d.]/g, "");

    inputField.value = currencySymbol + value
  }

  useEffect(() => {
    if (userType === 'customer') {
      navigate('/dashboard')
    }
  }, [userType])

  return (
    <div className='flex flex-col bg-white w-full h-full rounded-lg p-2 gap-2'>
      <div className='flex bg-gray-50 p-2 rounded-md justify-between'>
        <p className='text-xl'> My Ads </p>
        <button className='flex justify-center items-center px-2 py-1 rounded-md bg-green-500 text-white hover:bg-green-600'
          onClick={showModal}>
          Add New
        </button>
        <Modal okButtonProps={{ style: { backgroundColor: 'green' } }} title="Create an Ad" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <form id='createAdd'>
            <div className='flex flex-col gap-2'>
              <label className='text-lg'>Title</label>
              <input name='title' className='border-2 border-gray-300 rounded-md p-2' type='text' placeholder='Title' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-lg'>Description</label>
              <textarea name='description' className='border-2 border-gray-300 rounded-md p-2' type='text' placeholder='Description' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-lg'>Price</label>
              <input name='price' id='priceInput' className='border-2 border-gray-300 rounded-md p-2' type='text' placeholder='Price' onKeyUp={formatCurrency} />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-lg'>Image</label>
              <input name='image' className='border-2 border-gray-300 rounded-md p-2' type='file' placeholder='Image' accept='image/*' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-lg'>Contact</label>
              <input name='contact' className='border-2 border-gray-300 rounded-md p-2' type='text' placeholder='Contact' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-lg'>Location</label>
              <input name='location' className='border-2 border-gray-300 rounded-md p-2' type='text' placeholder='location' />
            </div>
          </form>
        </Modal>
      </div>
      <div className='flex bg-gray-50 p-2 rounded-md gap-2'>
      {
            selectedAds && Object.keys(selectedAds).map((i) => {
              return (
                <div className='flex  gap-1 relative flex-col rounded-md h-60 justify-center items-center w-1/6 p-3 bg-white hover:ring-2'>
                  <p className='text-xl'> {selectedAds[i].title} </p>
                  <img src={selectedAds[i].image} alt='ad' className='object-contain h-32 rounded-md' />
                  <p className='flex items-center justify-center gap-2'> <CiLocationOn /> {selectedAds[i].location} </p>
                  <DeleteModal id={i} />
                </div> 
              )
            }
            )
          }
      </div>
    </div>
  )
}

export default Portfilio