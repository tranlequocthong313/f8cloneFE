import VideoItem from './VideoItem'
import ScrollHorizontal from '../../../utils/scroll/ScrollHorizontal'

const VideoList = (props) => {
  return (
    <ScrollHorizontal path={'videos'}>
      {props.videos.map((video) => (
        <VideoItem key={video.videoId} video={video} />
      ))}
    </ScrollHorizontal>
  )
}

export default VideoList
