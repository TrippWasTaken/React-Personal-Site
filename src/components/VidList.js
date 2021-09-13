import VideoSlider from './VideoSlider'


const VidList = () => {
  const vidDict = {
    collab: ["ppGy206YO4A", "szfDKGZlYpo", "jRSKA2K5Q5s", "wRCj_I5LAGE"],
    paid: ["jYJS-fwJ5kA", "BqvH8HA2Q9w", "tb-Zf6o-aKY"],
    youtube: ["CE1okamdWws", "4F3dow4xgv0", "ZL-xi8MMDdY", "8gyfmQel3vo", "md6h8hfNbFo"],
    edits: ["o2nWi6io1Ig","DbtWt9Zi048", "bjpld4lABrw", "eWZsTewx5us"]
  }

  return (
    <section className="vidCont">
      <div className="vidGallery">
        <div className="vidInfo">
          <h1>Paid Work</h1>
          <p>While Im new to taking paid work I have found decent success working with local music artists, helping them get good quality videos that realize their vision.</p>
        </div>
        <VideoSlider videos={vidDict.paid} />
      </div>


      <div className="vidGallery">
        <div className="vidInfo">
          <h1>Collab Work</h1>
          <p>Here is some of the collab work that Ive done with other creators</p>
        </div>
        <VideoSlider videos={vidDict.collab} />
      </div>
      
      <div className="vidGallery">
        <div className="vidInfo">
          <h1>Personal Youtube</h1>
          <p>Ive made a bunch of many videos on youtube over the years, heres a few such as tutorials, news shows, or just goofy fun</p>
        </div>
        <VideoSlider videos={vidDict.youtube} />
      </div>

      <div className="vidGallery">
        <div className="vidInfo">
          <h1>Edits</h1>
          <p>One way of learning new techniques and effects is making small edits to some music heres some of the better ones</p>
        </div>
        <VideoSlider videos={vidDict.edits} />
      </div>

    </section>
  )
}
export default VidList