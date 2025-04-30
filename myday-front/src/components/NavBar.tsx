import React from 'react';


const Navbar: React.FC = () => {

    const handleLogout = () => {
        // Logique de déconnexion ici
        console.log('Déconnexion...');
    };

    return (
        <div className="navbar bg-primary text-primary-content px-4">
            <div className="flex-1">
                <a className="text-xl font-bold">myDay</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://placeimg.com/80/80/people" alt="Avatar" />
                        </div>
                    </label>
                    <ul className="menu menu-compact dropdown-content mt-5 p-2 shadow-lg bg-base-100 rounded-box w-52" >
                        <li>
                            <a>Mon Profil</a>
                        </li>
                        <li>
                            <a onClick={handleLogout}>Déconnexion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default Navbar;
