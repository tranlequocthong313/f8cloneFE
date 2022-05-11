import { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const Terms = () => {
  useEffect(() => (document.title = 'Điều khoản sử dụng'), [])

  return (
    <div className="container">
      <div className="containerTop">
        <h2>Điều khoản sử dụng</h2>
        <p>Điều khoản sử dụng</p>
      </div>
      <Container fluid style={{ padding: 0 }}>
        <Row style={{ marginTop: 0 }}>
          <Col xs={12} lg={8} xl={8}>
            Nội dung điều khoản sử dụng
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Terms
