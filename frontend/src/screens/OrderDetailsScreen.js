import React from 'react'

const OrderDetailsScreen = ({ match }) => {
  return (
    <div>
      <h2>Order {match.params.id}</h2>
    </div>
  )
}

export default OrderDetailsScreen
