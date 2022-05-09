import Tabs from '../../../utils/tabs/Tabs'
import styles from './AdminTabs.module.scss'

const AdminTabs = ({ tabs, setTabs }) => {
  return (
    <div className={styles.tabs}>
      <Tabs
        className={styles.tab}
        tab={'Thông tin chung'}
        onActive={() => setTabs('general')}
        isActive={tabs === 'general'}
        activeColor={styles.active}
      />
      <Tabs
        className={styles.tab}
        tab={'Mô tả thêm'}
        onActive={() => setTabs('description')}
        isActive={tabs === 'description'}
        activeColor={styles.active}
      />
      <Tabs
        className={styles.tab}
        tab={'Tóm tắt bài học'}
        onActive={() => setTabs('summary')}
        isActive={tabs === 'summary'}
        activeColor={styles.active}
      />
    </div>
  )
}

export default AdminTabs
