import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../services/Service';
import Topbar from '../../components/topbar/Topbar';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import ConfirmLogoutModal from '../../components/confirmationLogout/ConfirmationLogout'
import './profile.css'
const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserDetails(username);
            setUser(data);
        };

        fetchData();
    }, [username]);
    const handleLogout = () => {
        setShowConfirmLogoutModal(true);

    };
    const handleConfirmLogout = () => {
        // Clear user session
        localStorage.removeItem("user");
        navigate('/');
        setShowConfirmLogoutModal(false);
    };

    const handleCancelLogout = () => {
        setShowConfirmLogoutModal(false);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Topbar cart={true} />
            <div className="profile-page">
                <div className='welcomeText'>Welcome {username}</div>
                <div className='profile-content'>
                    <h2>Profile</h2>
                    <p>First Name: {user.firstname}</p>
                    <p>Last Name: {user.lastname}</p>
                    <p>Mobile Number: {user.mobilenumber}</p>
                    <p>Email: {user.email}</p>
                    <div className="profile-buttons">
                        <button className="profile-button logout" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                {/* <Modal isOpen={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)}>
                    <ChangePassword onChangePassword={handleChangePassword} />
                </Modal> */}
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                </Modal>
                <ConfirmLogoutModal
                    isOpen={showConfirmLogoutModal}
                    onConfirm={handleConfirmLogout}
                    onCancel={handleCancelLogout}
                />

            </div>
        </>
    );
};

export default Profile;
