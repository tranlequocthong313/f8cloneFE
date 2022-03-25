import { Form, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Search.module.scss'

const Search = ({ currentPage }) => {
  return (
    <>
      {currentPage !== 'new-blog' && (
        <Form className={styles.searchWrapper}>
          <div className={styles.searchIcon}></div>
          <FormControl
            type="search"
            placeholder="Tìm kiếm khóa học, bài viết, video, ..."
            className={styles.searchInput}
            aria-label="Search"
          />
        </Form>
      )}
    </>
  )
}

export default Search
