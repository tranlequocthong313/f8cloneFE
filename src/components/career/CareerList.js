import React from 'react'
import SecondaryCard from '../utils/card/SecondaryCard'
import { Row, Col } from 'react-bootstrap'
import styles from './CareerList.module.scss'

const CareerList = ({ careers }) => {
  careers.map(career => career)
  return careers.map(career => (
    <Row style={{ margin: 0 }}>
      <Col xl={8} style={{ padding: 0 }}>
        <SecondaryCard>
          <div className={styles.cardWrapper}>
            <h4>{career.title}</h4>
            <div className={styles.salary}>
              <i className="bi bi-currency-dollar"></i>
              Mức lương: <span>{career.salary}</span>
            </div>
            <div className={styles.skills}>
              {career.skills.map(skill => (
                <div className={styles.skillItem}>{skill}</div>
              ))}
            </div>
            <div className={styles.createdFromNow}>{career.time}</div>
          </div>
        </SecondaryCard>
      </Col>
    </Row>
  ))
}

export default CareerList
