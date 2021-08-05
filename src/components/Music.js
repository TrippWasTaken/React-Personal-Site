import React from 'react'
import { useRef, useEffect } from 'react'
import song1 from './resources/audio/1.mp3'
import song2 from './resources/audio/2.mp3'
import song3 from './resources/audio/3.mp3'
import song4 from './resources/audio/4.mp3'
import * as THREE from "three"

import CameraControls from 'camera-controls';
CameraControls.install({ THREE: THREE });


//audio
let audioDiv
let source

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
        const context = new (window.AudioContext || window.webkitAudioContext)()
        const analyser = context.createAnalyser();
        audioDiv = document.getElementById("songSource")
        source = context.createMediaElementSource(audioDiv)
        source.connect(analyser)
        analyser.connect(context.destination)
        analyser.smoothingTimeConstant = 0.8
        analyser.minDecibels = -100;
        analyser.maxDecibels = -10;

        //setting up visualizer buffers
        analyser.fftSize = 1024
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        //Three
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
        camera.position.set(0, 200, 500)

        const renderer = new THREE.WebGL1Renderer();
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
        ref.current.appendChild(renderer.domElement)

        const lines = new THREE.Group()
        const clock = new THREE.Clock();
        const cameraControls = new CameraControls(camera, renderer.domElement);

        const addL = () => {
            let z = 0
            const geometry = new THREE.BufferGeometry()
            const material = new THREE.PointsMaterial({
                size: 1
            })
            for (let l = 0; l < 20; l++) {
                // for (let i = 0; i < data.length; i++) {
                //     positions[3 * i] = ((window.innerWidth / 4) / (data.length) * i)   //x
                // }
                // geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
                const line = new THREE.Points(geometry, material)
                line.translateZ(z)

                // for (let i = 0; i < data.length; i++) {
                //     positions[3 * i + 1] = (data[i]) * -1   //y
                // }
                // geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
                lines.add(line)

                z = z - 10
            }
        }
        scene.add(lines);

        const moveL = (dataAudio) => {
            const dataA = dataAudio
            const dataB = dataAudio.slice().reverse()
            const data = [...dataB, ...dataA]
            const positions = new Float32Array(data.length * 3)
            for (let i = 0; i < data.length; i++) {
                positions[3 * i] = ((window.innerWidth / 4) / (data.length) * i)   //x
            }
            for (let i = 0; i < lines.children.length; i++) {
                for (let i = 0; i < data.length; i++) {
                    positions[3 * i + 1] = (data[i]) * -1   //y
                }
                lines.children[i].geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            }
        }

        let last = 0
        const animate = (now) => {
            if (!last || now - last >= 5) {
                last = now
                analyser.getByteFrequencyData(dataArray)
                moveL(dataArray)
            }

            const delta = clock.getDelta();
            const hasControlsUpdated = cameraControls.update(delta);

            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        };

        addL()
        console.table(lines)
        animate()
    }, [])

    const onSwitch = event => {
        switchSong(event.target.dataset.url)
    }

    return (
        <section className="musicCont">
            <h1>This area is still WIP</h1>
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
