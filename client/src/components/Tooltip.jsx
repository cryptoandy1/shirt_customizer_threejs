import { useEffect, useState } from 'react'

const Tooltip = ({ text, isEditorTab, children }) => {
  const [isVisible, setIsVisible] = useState(false)
  //   const [timeoutId, setTimeoutId] = useState()

  const handleMouseEvent = (flag) => {
    if (flag) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    // Automatically hide the tooltip after 3 seconds
    const timeoutId = setTimeout(() => {
      if (isVisible) {
        setIsVisible(false)
      }
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
      //   clearTimeout(timeoutId)
    }
  }, [isVisible])
  return (
    <div
      className={
        isEditorTab ? 'editor-tooltip-container' : 'filter-tooltip-container'
      }
      onMouseEnter={() => handleMouseEvent(true)}
      onMouseLeave={() => handleMouseEvent(false)}
    >
      {children}
      <div className={isVisible ? 'tooltip' : 'tooltip hidden'}>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default Tooltip
