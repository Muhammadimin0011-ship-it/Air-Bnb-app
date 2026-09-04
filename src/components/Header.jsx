import '../style/header.css';
import { Link } from 'react-router';
import SingUp from './SingUp';
import { useAuth } from '../store/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

function Header({ search, setSearch, setPage }) {

    function LeaveAccount() {
        localStorage.clear()
    }

    const { accessToken, user } = useAuth()
    return (
        <div className="header">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Logo_airbnb.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
                alt="logo"
            />

            <input
                type="text"
                value={search}
                placeholder="Search..."
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            {!accessToken ? <button>
                <Link to="/sing-up">Sign up</Link>
            </button> : (
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{user?.name.slice(0,1)}</Avatar>
            )}
        </div>
    );
}

export default Header;
