import React, { useRef, useState, useEffect } from 'react'
import styles from './NewBlog.module.scss'
import Editor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import '../sass/_myIcon.scss'
import Header from '../components/main-layout/nav/Header'
import Footer from '../components/main-layout/footer/Footer'
import '../sass/_custom.scss'
import BlogDetail from '../components/newBlog/BlogDetail'
import Sidebar from '../components/main-layout/sidebar/SideBar'
import { Row, Col } from 'react-bootstrap'
import BlogSameAuthor from '../components/newBlog/BlogSameAuthor'
import Reaction from '../components/newBlog/Reaction'
import ContentEditable from '../components/utils/content-editable/ContentEditable'
import Modal from '../components/newBlog/Modal'
import { v4 as uuidv4 } from 'uuid'

const NewBlog = () => {
  const mdEditor = useRef(null)
  const titleRef = useRef(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState()
  const [isValid, setIsValid] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState({
    id: '',
    title: '',
    content: '',
    titleDisplay: '',
    description: '',
    tags: [],
    allow: true,
    schedule: '',
    thumb: null,
  })
  /**
   * {
    title: 'Tìm hiểu về HTML và CSS',
    content:
    'Chào các bạn,\n\nLời đầu tiên mình xin chúc các bạn một năm mới an khang thịnh vượng, vạn sự như ý! Khai bút đầu xuân mình sẽ viết về chủ đề vô cùng quen thuộc với anh em lập trình web. Đó là HTML, CSS. Bài viết sẽ giới thiệu về HTML, CSS là gì, các thẻ cơ bản HTML, CSS. Mục đích của bài viết để tổng hợp kiến thức cơ bản về HTML, CSS.\n\n. HTML là gì?\n\nHTML là chữ viết tắt **Hypertext Markup Language**, là ngôn ngữ được sử dụng rộng rãi nhất để viết các trang Web. Hypertext là cách mà các trang Web (các tài liệu HTML) được kết nối với nhau. Và như thế, đường link có trên trang Web được gọi là Hypertext. Như tên gọi đã gợi ý, HTML là ngôn ngữ đánh dấu bằng thẻ (Markup Language), nghĩa là sử dụng HTML để đánh dấu một tài liệu text bằng các thẻ (tag) để nói cho trình duyệt Web cách để cấu trúc nó để hiển thị ra màn hình. Vậy HTML là ngôn ngữ sử dụng các thẻ để xây dựng nên khung sườn của  website.\n\nCài đặt extension Live Server Để việc thao tác được dễ dàng hơn, nên cài đặt Extension Live Server – giúp bạn tạo ngay một web server bên trong VSCode, hỗ trợ live reload. Rất tiện khi tạo layout HTML và tiết kiệm thời gian khi bạn.\n\nLink: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer image.png\n\nVí dụ cơ bản về HTML:\n\n```\n<!DOCTYPE>\n<html>\n<head>\n<title>Day la tieu de</title> </head> \n<body>\n<h>Day la dau de</h>\n<p>Phan noi dung cua tai lieu ...</p> </body>\n</html> \n\n```\n**Giải thích:**\n\n**<!DOCTYPE>**: Đây là thẻ có nhiệm vụ báo cho trình duyệt biết được file đang hiển thị là HTML. Mọi tài liệu HTML đều phải có thẻ này.\n\n**<html>**: Thẻ lớn nhất để bao bọc tất cả các thẻ con của file HTML. Gồm có  thẻ mở và đóng.\n\n**<head>**: Nằm giữa thẻ <html> và <body>, thẻ <head> có nhiệm vụ dùng để chứa các meta data. Nghĩa là chứa các data dùng chung, cần thiết cho file HTML. Như chứa tiêu đề, các thẻ link tới csss, script tới Javascript.\n\n**<title>**: Nằm giữa thẻ <head> chứa tiêu đề của file HTML.\n\n**<body>**: Thẻ xác định nội dung bên trong của file HTML. Vùng chứa toàn bộ nội dung của  trang web như header, footer, slider, hình ảnh, đoạn văn bản…\n\n. Các thẻ HTML\n\n* Các thẻ hiển thị đầu đề từ h đến h\n**Ví dụ:**\n\n```\n<h>Ví dụ tiêu đề </h>\n<h>Ví dụ tiêu đề </h>\n<h>Ví dụ tiêu đề </h>\n<h>Ví dụ tiêu đề </h>\n<h>Ví dụ tiêu đề </h>\n<h>Ví dụ tiêu đề </h>\n\n```\n* Thẻ biểu diễn đoạn văn bản. p viết tắt là paragraph nghĩa là một đoạn văn bản.\n**Ví dụ:**\n\n```\n<p>Nội dung đoạn văn bản</p>\n```\n',
    tags: ['Front-end', 'html', 'CSS', 'html5'],
  }
   */
  const [scrollY, setScrollY] = useState(0)

  const LIMIT_TITLE_LENGTH = 190

  useEffect(() => {
    // Set browser title = title
    document.title = title

    // User has to enter title and content then the 'POST' button is active
    if (content && title) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [content, title])

  const blogDataHandler = async detail => {
    console.log(detail)
    if (detail) {
      setData(prev => {
        return {
          ...prev,
          ...detail,
        }
      })

      try {
        const res = await fetch('https://f8clone.herokuapp.com/new-blog', {
          method: 'POST',
          body: JSON.stringify({ ...data }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const newData = await res.json()

        console.log(newData.message)
      } catch (error) {
        console.log(error.message)
      }
      return
    }

    if (
      mdEditor.current &&
      title.length > 0 &&
      title.length <= LIMIT_TITLE_LENGTH
    ) {
      const data = {
        id: uuidv4(),
        title: titleRef.current.innerText,
        content: mdEditor.current.getMdValue(),
      }

      titleRef.current.innerText = data.title

      setData(prev => {
        return {
          ...prev,
          ...data,
        }
      })
    }
  }

  const editorChangeHandler = ({ html, text }) => {
    const newContent = text.replace(/\d/g, '')
    setContent(newContent)
  }

  const checkTitleLengthHandler = e => {
    let length = e.target.innerText.trim().length
    const selection = window.getSelection()
    let hasSelection = false

    if (e.clipboardData) {
      setTitle(e.clipboardData.getData('Text').substring(0, LIMIT_TITLE_LENGTH))
    } else {
      setTitle(e.target.innerText)
    }

    if (selection) {
      hasSelection = !!selection.toString()
    }

    if (length >= LIMIT_TITLE_LENGTH && !hasSelection) {
      e.preventDefault()
      return false
    }
  }

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      setScrollY(scrollY)
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {!showModal && (
        <>
          <Header
            currentPage={'new-blog'}
            blogDataHandler={blogDataHandler}
            setShowModal={setShowModal}
            isValid={isValid}
          />
          <div className={styles.wrapper}>
            <ContentEditable
              value={data.title}
              text={'Tiêu đề'}
              className={styles.contentEditable}
              onKeyPress={checkTitleLengthHandler}
              onPaste={checkTitleLengthHandler}
              ref={titleRef}
            />
            <Editor
              ref={mdEditor}
              value={content}
              onChange={editorChangeHandler}
              renderHTML={text => <ReactMarkdown children={text} />}
            />
          </div>
        </>
      )}
      {showModal && (
        <Modal
          blogDataHandler={blogDataHandler}
          data={data}
          setShowModal={setShowModal}
        />
      )}
      <Footer />
    </>
  )
}

export default NewBlog

/**
 * 
 * <>
          <Header scrollY={scrollY} />
          <div className={styles.sidebarWrap}>
            <Sidebar />
          </div>
          <BlogDetail data={data} />
        </>
 */
