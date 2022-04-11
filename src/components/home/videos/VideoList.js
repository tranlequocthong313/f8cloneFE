import React from 'react'
import VideoItem from './VideoItem'
import ScrollHorizontal from '../../utils/scroll/ScrollHorizontal'
import MainCardAdd from '../../utils/card/MainCardAdd'
import { useSelector } from 'react-redux'

const VideoList = (props) => {
  const user = useSelector((state) => state.user)

  return (
    <ScrollHorizontal path={'videos'}>
      {props.videos.map((video) => (
        <VideoItem key={video.videoId} video={video} />
      ))}
      {user.isAdmin && (
        <MainCardAdd path={'/admin/video'}>Thêm video</MainCardAdd>
      )}
    </ScrollHorizontal>
  )
}

export default VideoList
