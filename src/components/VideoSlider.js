import Video from './Video'
import { useState } from 'react'
import Thumbnail from './Thumbnail'

const VideoSlider = (props) => {

  const [current, setCurrent] = useState(0)

  return (
    <container className="sliderCont">
      <section className="slider">
        {
          props.videos.map((link, index) => (
            <div className={index === current ? "slideActive" : "slide"} key={index} >
              {index === current && (
                <Video link={link} />
              )}
            </div>
          ))
        }
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
