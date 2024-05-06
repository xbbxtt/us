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
        <nav className="bg-pink-300 py-4 fixed top-0 left-0 w-full">
            <div className="mx-auto max-w-7xl px-4">
                <ul className="flex justify-between">
                    {!user && (
                        <li>
                            <NavLink
                                to={'/'}
                                className="text-white hover:text-gray-300"
                            >
                                Home
                            </NavLink>
                        </li>
                    )}
                    {!user && (
                        <li>
                            <NavLink
                                to={'/signup'}
                                className="text-white hover:text-gray-300"
                            >
                                Sign Up
                            </NavLink>
                        </li>
                    )}
                    {!user && (
                        <li>
                            <NavLink
                                to={'/signin'}
                                className="text-white hover:text-gray-300"
                            >
                                Sign In
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink
                                to={'/romantic-pref'}
                                className="text-white hover:text-gray-300"
                            >
                                Romantic Preferences
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink
                                to={'/likes'}
                                className="text-white hover:text-gray-300"
                            >
                                Likes
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink
                                to={'/romantic-preferences'}
                                className="text-white hover:text-gray-300"
                            >
                                Get to swiping!
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink
                                to={'/matches'}
                                className="text-white hover:text-gray-300"
                            >
                                Matches
                            </NavLink>
                        </li>
                    )}
                </ul>
                {user && (
                    <button className="btn mt-4" onClick={onSignoutClick}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Nav
