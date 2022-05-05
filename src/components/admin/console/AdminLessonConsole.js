import React, { useState } from 'react'
import Tabs from '../../utils/tabs/Tabs'
import AdminTabs from '../tabs/AdminTabs'
import styles from './AdminLessonConsole.module.scss'
import AdminDescription from './components/AdminDescription'
import AdminGeneral from './components/AdminGeneral'
import AdminSummary from './components/AdminSummary'

const AdminLessonConsole = () => {
  const [tabs, setTabs] = useState('general')

  return (
    <>
      <AdminTabs tabs={tabs} setTabs={setTabs} />
      {tabs === 'general' && <AdminGeneral />}
      {tabs === 'description' && <AdminDescription />}
      {tabs === 'summary' && <AdminSummary />}
    </>
  )
}

export default AdminLessonConsole
