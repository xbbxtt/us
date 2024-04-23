import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to={'/'}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/signup'}>Sign Up</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/signin'}>Sign In</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Nav
