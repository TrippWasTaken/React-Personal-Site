import React from 'react'
import { useRef, useEffect } from 'react'
import song1 from './resources/audio/1.mp3'
import song2 from './resources/audio/2.mp3'
import song3 from './resources/audio/3.mp3'
import song4 from './resources/audio/4.mp3'
import * as THREE from "three"
import { randInt } from 'three/src/math/MathUtils'

let audioDiv
let source
const context = new (window.AudioContext || window.webkitAudioContext)()
const analyser = context.createAnalyser();

const songlist = [{ url: song1, name: "I'll Never Leave" },
{ url: song2, name: "I dont Understand" },
{ url: song3, name: "Lost In A New World" },
{ url: song4, name: "Beyond It All, Lies Nothing But Isolation" },
]



const switchSong = (url) => {
    if (audioDiv.getAttribute("src") !== url) {
        audioDiv.pause()
        audioDiv.setAttribute("src", url)
        audioDiv.load()
        audioDiv.play()
    }
}

const Music = () => {
    let ref = useRef(null)

    useEffect(() => {
        //setting up audio
        audioDiv = document.getElementById("songSource")
        source = context.createMediaElementSource(audioDiv)
        source.connect(analyser)
        analyser.connect(context.destination)

        //setting up visualizer buffers
        analyser.fftSize = 1024
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
        ref.current.appendChild(renderer.domElement)
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500)
        camera.position.set(0, 0, 50)
        camera.lookAt(0, 45, 0)

        const geometry = new THREE.PlaneGeometry(200, 200, 20, 20)

        const material = new THREE.PointsMaterial({
            size: 1,
            transparent: true
        })
        material.color = new THREE.Color("rgb(255,255,255)")

        const mesh = new THREE.Points(geometry, material)
        scene.add(mesh)

        const draw = () => {

        }

        renderer.render(scene, camera)
        draw()
    })

    const onSwitch = event => {
        switchSong(event.target.dataset.url)
    }


    return (
        <section className="musicCont">
            <section className="audioVisCont" ref={ref}>
            </section>
            <section className="songControls">
                <div className="audioPlayer">
                    <audio id="songSource" src={song1} controls>
                    </audio>
                </div>
                <div className="songList">
                    {
                        songlist.map((list) => (
                            <div className="songItem" onClick={onSwitch} key={list.url} data-url={list.url}> {list.name}</div>
                        ))
                    }
                </div>

            </section>
        </section>
    )
}


export default Music
