import React from 'react'
import loadingGif from '../images/loading.gif' // Update with your GIF path

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={loadingGif} alt="Loading..." className="loading-gif" />
    </div>
  )
}

export default Loading
