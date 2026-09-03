import '../style/header.css';
import { Link } from 'react-router';
import SingUp from './SingUp';

function Header({ search, setSearch, setPage }) {
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

            <button>
                <Link to="/sing-up">Sign up</Link>
            </button>
        </div>
    );
}

export default Header;
