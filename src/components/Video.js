import ReactPlayer from 'react-player'

const Video = (props) => {
  return (
    <div className = "video">
      <ReactPlayer 
      url={"https://www.youtube.com/watch/"+ props.link}
      />
    </div>
  )
}

export default Video