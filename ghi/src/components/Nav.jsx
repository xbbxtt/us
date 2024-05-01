import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthenticateQuery } from '../app/apiSlice'
// import { useSignoutMutation } from '../app/apiSlice'
// import { useEffect } from 'react'

const Nav = () => {
    const navigate = useNavigate()
    const { data: user, isLoading } = useAuthenticateQuery()
    // const [signout, signoutStatus] = useSignoutMutation()

    // useEffect(() => {
    //     if (signoutStatus.isSuccess) {
    //         navigate('/')
    //     }
    // }, [signoutStatus])

    // const onSignoutClick = (e) => {
    //     signout()
    // }

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
                    {/* <li>
                        <NavLink to={'/signout'}>Sign Out</NavLink>
                    </li> */}
                    <li>
                        <NavLink to={'/romantic-pref'}>
                            Romantic Preferences
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/likes'}>Likes</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Nav
