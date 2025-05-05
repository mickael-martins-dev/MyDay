import Logo from './atoms/Logo';

interface IProps {
    logout: () => void;
}

const Navbar = (props: IProps) => {
    return (
        <nav className="navbar bg-primary text-white px-6">
            <Logo />
            <ul className="menu menu-horizontal px-1 space-x-4">
                <li><a href='/'>Accueil</a></li>
                <li><a href='/history'>Statistiques </a></li>
                <li><a href='#' onClick={props.logout}>Déconnexion</a></li>
            </ul>
        </nav >
    );
}

export default Navbar;
