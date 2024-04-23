import { Outlet } from 'react-router-dom'

import './App.css'

function App() {
    return (
        <div className="App">
            <header className="App-header">{/* <Nav /> */}</header>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <Outlet />
            <footer>
                <h3>Footer....</h3>
            </footer>
        </div>
    )
}

export default App
