import { NavLink } from 'react-router-dom'
import { useAuthenticateQuery } from '../app/apiSlice'

const Nav = () => {
    const {data: user, isLoading} = useAuthenticateQuery()
    console.log({user, isLoading});

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
                    <li>
                        <NavLink to={'/1234'}>Get Liking</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Nav
