import { Button, Modal } from 'antd';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai'
import { setDoc, doc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/auth';
import { useSelector } from 'react-redux';

const App = ({ id }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const ads = useSelector((state) => state.ads)
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (id) => {
        console.log(id)
        const collectionName = ads[id].type === 'retailer' ? 'retailer-ads' : 'farmer-ads';
        deleteDoc(doc(db, collectionName, id));
        setIsModalOpen(false);
        window.location.reload();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal} className='bg-green-400 hover:bg-green-600'>
                <AiFillDelete />
            </Button>
            <Modal title="Delete Ad" okButtonProps={{ style: { backgroundColor: 'green' } }} open={isModalOpen} onOk={() => {handleOk(id)}} onCancel={handleCancel}>
                Are you sure you want to delete this ad ?
            </Modal>
        </>
    );
};
export default App;