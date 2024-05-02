import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthenticateQuery, useSignoutMutation } from '../app/apiSlice'
import { useEffect } from 'react'


const Nav = () => {
    const navigate = useNavigate()
    const { data: user } = useAuthenticateQuery()


    const [signout, signoutStatus] = useSignoutMutation()

    useEffect(() => {
        if (signoutStatus.isSuccess) {
            navigate('/')
        }
    }, [signoutStatus])

    const onSignoutClick = (e) => {
        signout()
    }

    return (
        <>
            <nav>
                <ul>
                    {!user && <li>
                        <NavLink to={'/'}>Home</NavLink>
                    </li>}
                    {!user && <li>
                        <NavLink to={'/signup'}>Sign Up</NavLink>
                    </li>}
                    {!user &&<li>
                        <NavLink to={'/signin'}>Sign In</NavLink>
                    </li>}
                    {/* <li>
                        <NavLink to={'/signout'}>Sign Out</NavLink>
                    </li> */}
                    {user &&<li>
                        <NavLink to={'/romantic-pref'}>
                            Romantic Preferences
                        </NavLink>
                    </li>}
                    {user &&<li>
                        <NavLink to={'/likes'}>Likes</NavLink>
                    </li>}
                    {user &&<li>
                        <NavLink to={'/romantic-preferences'}>
                            Get to swiping!
                        </NavLink>
                    </li>}
                </ul>
                {user && <button className='btn btn-outline-danger' onClick={onSignoutClick}>Logout</button>}
            </nav>
        </>
    )
}


export default Nav
