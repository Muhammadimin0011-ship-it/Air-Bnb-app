import MenuIcon from '@mui/icons-material/Menu';

function Header() {
    return (
        <div>
            <img width='50px' src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Logo_airbnb.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" alt="logo" />


            <input type="text" placeholder="enter a text for search apartments" />


            <button> <MenuIcon /></button>
        </div>
    )
}

export default Header