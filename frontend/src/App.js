import React from 'react'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
    return (
        <>
            <Header />
            <main>
                <Container className='text-center py-3'>
                    <HomeScreen />
                </Container>
            </main>
            <Footer />
        </>
    )
}

export default App
