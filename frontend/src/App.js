import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
    return (
        <>
            <Header />
            <main>
                <Container className='text-center py-3'>
                    <h1>Welcome To ProShop</h1>
                </Container>
            </main>
            <Footer />
        </>
    )
}

export default App
