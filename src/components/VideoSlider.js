import Video from './Video'
import { useState } from 'react'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import Thumbnail from './Thumbnail'

const VideoSlider = (props) => {

  const [current, setCurrent] = useState(0)
  const length = props.videos.length

  return (
    <container className="sliderCont">
      <section className="slider">
        {/* <MdKeyboardArrowLeft className="leftA" id = "Arrow" onClick={() => setCurrent(current === 0 ? length - 1 : current - 1)} /> */}
        {
          props.videos.map((link, index) => (
            <div className={index === current ? "slideActive" : "slide"} key={index} >
              {index === current && (
                <Video link={link} />
              )}
            </div>
          ))
        }
        {/* <MdKeyboardArrowRight className="rightA" id = "Arrow" onClick={() => setCurrent(current === length - 1 ? 0 : current + 1)} /> */}
      </section>
      <section className = "thumbnails">
        {
          props.videos.map((link, index) => (
            <div className = {index === current ? "thumbActive" : "thumb"} key = {index} onClick={()=>setCurrent(index)}>
              <Thumbnail link ={link} />
            </div>
          ))
        } 
      </section>
    </container>
  )
}
export default VideoSlider
