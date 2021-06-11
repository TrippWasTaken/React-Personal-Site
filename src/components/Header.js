import { useState } from "react"
import {SiInstagram, SiTwitter, SiGmail, SiYoutube} from "react-icons/si"
const Header = () => {

  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  if (modal) {
    document.body.classList.add("activeModal")
  } else {
    document.body.classList.remove("activeModal")
  }

  return (
    <section className="mainSec">
      <div className="header">
        <div className="headerTitle">
          <h1>TrippMedia</h1>
        </div>
        <div className="headerNav">
          <button className="headerBtn" onClick={toggleModal}>About</button>
          <button className="headerBtn">Music</button>
        </div>
      </div>
      {
        modal &&
        <div className="modal">
          <div className="modalContent">
            <button className=" closeModal" onClick={toggleModal}>
              X
          </button>
            <h1>About me</h1>
            <p>
              Making youtube videos since I was 12, I have been video editing for fun half my life. 
              With the recent year of lockdown I decided to invest time and money into the passion I had once forgotten 
              and step up my abilities and pursue more professional projects.
            </p>
            <p>
            I am proficient in most of the adobe creative suite however my main program of choice is Blackmagic Medias Davinci Resolve 17 as I find the After Effects/Premiere Pro workflow extremely sluggish.
            </p>
          <h1>Contact me</h1>
          <p>You can easily contact me using either my email or any social media</p>
          <a href = "mailto:tripp@trippmedia.tech" target="_blank" rel="noopener noreferrer">
          <h2><SiGmail></SiGmail> Tripp@trippmedia.tech</h2>
          </a>
          <a href = "https://www.instagram.com/tripp.h265/" target="_blank" rel="noopener noreferrer">
          <h2><SiInstagram></SiInstagram> @Tripp.h265</h2>
          </a>
          <a href = "https://twitter.com/TrippIRL" target="_blank" rel="noopener noreferrer">
          <h2><SiTwitter></SiTwitter> @TrippIRL</h2>
          </a>
          <a href = "https://www.youtube.com/c/TrippEdits/featured" target="_blank" rel="noopener noreferrer">
          <h2><SiYoutube></SiYoutube> Tripp.</h2>
          </a>
          </div>
          <div className="overlay" onClick={toggleModal}></div>
        </div>
      }
    </section>
  )
}

export default Header
