import React from 'react'
import { useRef, useEffect } from 'react'
import song1 from './resources/audio/1.mp3'
import song2 from './resources/audio/2.mp3'
import song3 from './resources/audio/3.mp3'
import song4 from './resources/audio/4.mp3'
import * as THREE from "three"

import CameraControls from 'camera-controls';
import { randInt } from 'three/src/math/MathUtils'
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
        analyser.fftSize = 512
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        //Three
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.0001, 5000)
        camera.position.set(-200, 200, 400)
        //camera.lookAt(500,0,0)

        const renderer = new THREE.WebGL1Renderer();
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
        ref.current.appendChild(renderer.domElement)

        const lines = new THREE.Group()
        const clock = new THREE.Clock();
        const cameraControls = new CameraControls(camera, renderer.domElement);

        const addLines = () => {
            let z = 0
            const geometry = new THREE.BufferGeometry()
            for (let l = 0; l < 100; l++) {
                const material = new THREE.PointsMaterial({
                    size: 1
                })
                const line = new THREE.Points(new THREE.BufferGeometry(), material)
                line.translateZ(z)
                lines.add(line)
                z = z - 10
            }
        }
        scene.add(lines);
        const dataC = []

        const moveL = (dataAudio, i) => {
            const dataA = dataAudio
            const dataB = dataAudio.slice().reverse()
            const data = [...dataB, ...dataA]
            const positions = new Float32Array(data.length * 3)
            const loudness = Math.max(...dataAudio)
            for (let i = dataC.length - 1; i > 0; i--) {
                const current = lines.children[i].geometry.getAttribute('position')
                const l = (dataC.length - i) / dataC.length * loudness
                if (current) {
                    current.array = dataC[i - 1]
                    lines.children[i].material.color = new THREE.Color('hsl(' + l + ', 100%, 50%)')
                    current.needsUpdate = true
                } else {
                    lines.children[i].geometry.setAttribute('position', new THREE.BufferAttribute(dataC[i - 1], 3))
                }
            }

            for (let y = 0; y < data.length; y++) {
                positions[3 * y + 1] = data[y] * -1 //y
                positions[3 * y] = ((window.innerWidth / 4) / (data.length) * y)   //x
            }

            lines.children[i].geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            lines.children[i].material.color = new THREE.Color('hsl(' + loudness + ', 100%, 50%)')

            dataC.unshift(positions)
            if (dataC.length > lines.children.length) {
                dataC.pop()
            }
        }

        let last = 0
        let i = 0
        const animate = (now) => {
            if (!last || now - last >= 5) {
                analyser.getByteFrequencyData(dataArray)
                last = now
                moveL(dataArray, 0)
            }
            const delta = clock.getDelta();
            const hasControlsUpdated = cameraControls.update(delta);
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        };
        
        addLines()
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
