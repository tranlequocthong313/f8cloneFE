import React from 'react'
import SecondaryCard from '../utils/card/SecondaryCard'
import { Row, Col } from 'react-bootstrap'
import styles from './CareerList.module.scss'
import timeSince from '../utils/timeSince/timeSince'

const CareerList = ({ jobs, xl }) => {
  const formatSalary = (salary) =>
    new Intl.NumberFormat(['ban', 'id']).format(salary)

  return (
    <Row style={{ margin: 0 }}>
      {jobs?.map((job) => (
        <Col xl={xl} style={{ padding: 0 }} key={job._id}>
          <SecondaryCard>
            <div className={styles.cardWrapper}>
              <h4>{job.title}</h4>
              <div className={styles.salary}>
                <i className="fa-solid fa-dollar-sign"></i>
                Mức lương:{' '}
                <span>
                  {formatSalary(job.minSalary)} - {formatSalary(job.maxSalary)}
                </span>
              </div>
              <div className={styles.languages}>
                {job.languages?.map((language) => (
                  <div className={styles.languageItem} key={language}>
                    {language}
                  </div>
                ))}
              </div>
              <div className={styles.createdFromNow}>
                {timeSince(job.createdAt)}
              </div>
            </div>
          </SecondaryCard>
        </Col>
      ))}
    </Row>
  )
}

export default CareerList
