import React from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <Container>
      <Row
        className="d-flex justify-content-center align-items-center m-0 p-0"
        style={{ height: '100vh', color: '#f05123' }}
      >
        <Spinner animation="border" />
      </Row>
    </Container>
  )
}

export default Loading
