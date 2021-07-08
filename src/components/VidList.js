import VideoSlider from './VideoSlider'


const VidList = () => {
  const vidDict = {
    personal: ["ppGy206YO4A","eWZsTewx5us","jYJS-fwJ5kA", "szfDKGZlYpo", "9AE5p58tDBY", "H5-xG9yBZcM"],
    paid: ["BqvH8HA2Q9w", "tb-Zf6o-aKY"]
  }

  return (
    <section className="vidCont">
      
      <div className = "vidGallery">
        <h1>Personal Work</h1>
        <p>Some things I made for fun in my own spare time</p>
        <VideoSlider videos = {vidDict.personal} />
      </div>

      <div className = "vidGallery">
        <h1>Paid Work</h1>
        <p>Some recent examples of my client work</p>
        <VideoSlider videos = {vidDict.paid} />
      </div>
    </section>
  )
}
export default VidList