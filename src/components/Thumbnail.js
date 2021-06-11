import React from 'react'

const Thumbnail = (props) => {
  return (
    <div className = "videoImg">
      <img src = {" http://i3.ytimg.com/vi/" + props.link +"/maxresdefault.jpg" } alt = {props.link} ></img>
    </div>
  )
}

export default Thumbnail
