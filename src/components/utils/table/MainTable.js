import React from 'react'
import { Table } from 'react-bootstrap'
import styles from './MainTable.module.scss'

const MainTable = ({ children }) => {
  return <Table className={styles.wrapper}>{children}</Table>
}

export default MainTable
