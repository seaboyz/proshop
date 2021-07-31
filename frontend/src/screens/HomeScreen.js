import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import { listProducts } from "../actions/productActions"

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  // useSelector
  // https://react-redux.js.org/api/hooks#useselector
  // extract data from the Redux store state
  const productList = useSelector(state => state.productList)

  const { products, loading, error } = productList

  return (
    <>
      {loading ? (
        <h1>LORDING...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <h1>Lastest Products</h1>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
