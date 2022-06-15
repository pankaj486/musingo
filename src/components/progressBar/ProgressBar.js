import React, { useEffect, useRef } from 'react'
import './ProgressBar.scss'

const ProgressBar = props => {
  let filler = useRef(null)
  useEffect(() => {
    let progress = 0
    filler.current.style.width = `${progress}%`
    let timer = setInterval(function () {
      progress += 10
      filler.current.style.width = `${progress}%`
      if (progress > 100) {
        clearInterval(timer)
        filler.current.style.width = 0
      }
    }, 220)
    return () => {
      clearInterval(timer)
    }
  }, [props.filterTypeModalType])
  //
  // useEffect(() => {
  //   if (props.filterTypeModalType) {
  //     let progress = 0
  //     filler.current.style.width = `${progress}%`
  //     let timer = setInterval(function () {
  //       progress += 50
  //       filler.current.style.width = `${progress}%`
  //       if (progress >= 100) {
  //         clearInterval(timer)
  //       }
  //     }, 400)
  //   }
  // }, [props.filterTypeModalType])
  
  
  return (
    <div className="loader-progress-bar" style={{ width: props.width ? props.width : '50%' }}>
      <div className="loader-progress" ref={filler}> </div>
    </div>
  )
}

export default ProgressBar