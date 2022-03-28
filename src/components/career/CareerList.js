import React from 'react'
import SecondaryCard from '../utils/card/SecondaryCard'
import { Row, Col } from 'react-bootstrap'
import styles from './CareerList.module.scss'
import timeSinceHandler from '../utils/timeSinceHandler/timeSinceHandler'

const CareerList = ({ jobs }) => {
  const formatNumber = number => {
    return new Intl.NumberFormat(['ban', 'id']).format(number)
  }

  return jobs.map(job => (
    <Row style={{ margin: 0 }} key={job._id}>
      <Col xl={8} style={{ padding: 0 }}>
        <SecondaryCard>
          <div className={styles.cardWrapper}>
            <h4>{job.title}</h4>
            <div className={styles.salary}>
              <i className="bi bi-currency-dollar"></i>
              Mức lương:{' '}
              <span>
                {formatNumber(job.minSalary)} - {formatNumber(job.maxSalary)}
              </span>
            </div>
            <div className={styles.languages}>
              {job.languages.map(language => (
                <div className={styles.languageItem}>{language}</div>
              ))}
            </div>
            <div className={styles.createdFromNow}>
              {timeSinceHandler(job.createdAt)}
            </div>
          </div>
        </SecondaryCard>
      </Col>
    </Row>
  ))
}

export default CareerList
