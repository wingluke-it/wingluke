import React, { useState } from "react"
import styles from "./playPauseButton.module.scss"
import { AiFillPauseCircle } from "@react-icons/all-files/ai/AiFillPauseCircle"
import { AiFillPlayCircle } from "@react-icons/all-files/ai/AiFillPlayCircle"

const PlayPauseButton = ({ bgVid }) => {
  const [paused, setPaused] = useState(Boolean(bgVid?.current?.paused))
  const playPause = () => {
    if (paused) {
      bgVid.current.play()
      setPaused(false)
    } else {
      bgVid.current.pause()
      setPaused(true)
    }
  }
  return (
    <button className={styles.playPauseButton} onClick={playPause}>
      {paused ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
      <span>{paused ? "Play" : "Pause"}</span>
    </button>
  )
}

export default PlayPauseButton
