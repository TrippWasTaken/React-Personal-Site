import ReactPlayer from 'react-player'

const Video = (props) => {
  return (
    <div className = "videoCont">
      <ReactPlayer className= "reactPlayer"
      url={"https://youtu.be/"+ props.link}
      controls={true}
      width="100%"
      height="100%"
      />
    </div>
  )
}

export default Video