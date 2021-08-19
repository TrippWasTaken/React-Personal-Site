import VideoSlider from './VideoSlider'


const VidList = () => {
  const vidDict = {
    personal: ["DbtWt9Zi048", "8Jhns3_S7vY", "ppGy206YO4A", "eWZsTewx5us", "szfDKGZlYpo", "bjpld4lABrw"],
    paid: ["jYJS-fwJ5kA", "BqvH8HA2Q9w", "tb-Zf6o-aKY"]
  }

  return (
    <section className="vidCont">
      <div className="vidGallery">
        <div className="vidInfo">
          <h1>Personal Work</h1>
          <p>Some things I made for fun in my own spare time</p>
        </div>
        <VideoSlider videos={vidDict.personal} />
      </div>

      <div className="vidGallery">
        <div className="vidInfo">
          <h1>Paid Work</h1>
          <p>Some recent examples of my client work</p>
        </div>
        <VideoSlider videos={vidDict.paid} />
      </div>
    </section>
  )
}
export default VidList