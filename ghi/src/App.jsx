import { Outlet } from 'react-router-dom'

import Nav from './components/Nav'
import Footer from './components/Footer'
import './App.css'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Nav />
            </header>
            <Outlet />
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default App
