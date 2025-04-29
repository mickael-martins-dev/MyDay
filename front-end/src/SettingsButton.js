import React from 'react';
import { useNavigate } from 'react-router-dom';

function SettingsButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Settings');
    };

    return (

        <button type="button" className="submit-button-settings" onClick={handleClick}>
            <img src="/settings.png" alt="Logout" className="settings-icon" />
        </button>
    );
}

export default SettingsButton;
