import { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const Privacy = () => {
  useEffect(() => (document.title = 'Chính sách bảo mật'), [])

  return (
    <div className="container">
      <div className="containerTop">
        <h2>Chính sách bảo mật</h2>
        <p>Chính sách bảo mật</p>
      </div>
      <Container fluid style={{ padding: 0 }}>
        <Row style={{ marginTop: 0 }}>
          <Col xs={12} lg={8} xl={8}>
            Nội dung chính sách bảo mật
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Privacy
