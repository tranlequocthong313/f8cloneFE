import React, { useState } from 'react'
import Tabs from '../../utils/tabs/Tabs'
import AdminTabs from '../tabs/AdminTabs'
import styles from './AdminLessonConsole.module.scss'
import AdminGeneral from './components/AdminGeneral'

const AdminLessonConsole = () => {
  const [tabs, setTabs] = useState('general')

  return (
    <>
      <AdminTabs tabs={tabs} setTabs={setTabs} />
      <AdminGeneral />
    </>
  )
}

export default AdminLessonConsole
