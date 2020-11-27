import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
    return (
        <Router>
            <Header />
            <main>
                <Container className='text-center py-3'>
                    <Route path='/' component={HomeScreen} exact />
                    <Route path='/product/:id' component={ProductScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

export default App
