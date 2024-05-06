import { Outlet } from 'react-router-dom'

import Nav from './components/Nav'
import './App.css'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Nav />
            </header>
            <Outlet />
            <footer>
                <h3>Footer....</h3>
            </footer>
        </div>
    )
}

export default App
