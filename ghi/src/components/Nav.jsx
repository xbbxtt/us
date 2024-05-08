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
        <nav className="bg-pink-300 py-2 fixed top-0 left-0 w-full">
            <div className="mx-auto max-w-7xl px-2">
                <ul className="flex items-start mx-2">
                    {!user && (
                        <li>
                            <NavLink
                                to={'/'}
                                className="text-white hover:text-gray-300 px=4"
                            >
                                Home
                            </NavLink>
                        </li>
                    )}
                    {!user && (
                        <li>
                            <NavLink
                                to={'/signup'}
                                className="text-white hover:text-gray-300 px-4"
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
                                className="text-white hover:text-gray-300 px-4"
                            >
                                Romantic Preferences
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink
                                to={'/likes'}
                                className="text-white hover:text-gray-300 px-4"
                            >
                                Likes
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink
                                to={'/romantic-preferences'}
                                className="text-white hover:text-gray-300 px-4"
                            >
                                Get to swiping!
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink
                                to={'/matches'}
                                className="text-white hover:text-gray-300 px-4"
                            >
                                Matches
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <button
                            className="btn bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md ml-auto mt-1"
                            onClick={onSignoutClick}
                        >
                            Logout
                        </button>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Nav
