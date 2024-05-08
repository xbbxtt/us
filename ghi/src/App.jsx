import { Outlet } from 'react-router-dom'

import Nav from './components/Nav'
import Footer from './components/Footer'
import './App.css'

function App() {
    return (
        <div className="App flex flex-col min-h-screen">
            <header className="App-header">
                <Nav />
            </header>
            <div className="main-content flex-grow">
                <Outlet />
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default App
