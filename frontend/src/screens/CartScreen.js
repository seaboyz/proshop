import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'

function CartScreen({ match, location, history }) {
    const productId = match.params.id
    // get qty either from the url or default 1
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    useEffect(() => {
        productId && dispatch(addToCart(productId, qty))
    }, [dispatch, productId, qty])

    return <div>Cart</div>
}

export default CartScreen
