import { useRef, useEffect } from 'react'

export const downloadCanvasToImage = () => {
  const canvas = document.querySelector('canvas')
  const dataURL = canvas.toDataURL()
  const link = document.createElement('a')

  link.href = dataURL
  link.download = 'canvas.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const downloadPngImage = (img) => {
  // const imageBuffer = Buffer.from(img, 'base64')
  const link = document.createElement('a')
  link.href = img
  link.download = 'logo.png'
  link.click()
}

export const canvasToPng = async () => {
  const canvas = document.querySelector('canvas')
  const imgPng = canvas.toDataURL('image/png', 1.0)
  const img = new Image()
  img.src = imgPng

  // Wrap the image loading in an async function
  const loadImage = async () => {
    return new Promise((resolve) => {
      img.onload = () => {
        resolve()
      }
    })
  }

  await loadImage() // Wait for the image to load
  // const aspectRatio = img.naturalWidth / img.naturalHeight
  const originalWidth = img.naturalWidth
  const originalHeight = img.naturalHeight

  // Calculate the width and height of the cropped portion
  let croppedWidth = 0
  let croppedHeight = 0
  let sx = 0
  let sy = 0
  if (originalWidth > originalHeight) {
    croppedHeight = croppedWidth = 0.55 * originalWidth

    sx = 0.22 * originalWidth
    sy = 0
  } else {
    if (originalHeight > originalWidth || originalWidth > 1080) {
      croppedHeight = croppedWidth = originalWidth
      sx = 0
      sy = 0.225 * originalHeight
    }
    if (originalHeight > originalWidth || originalWidth < 1080) {
      croppedHeight = croppedWidth = originalWidth
      sx = 0
      sy = 0.25 * originalHeight
    }
  }
  // Calculate the starting point for cropping (from the left)

  // Create a new canvas with the dimensions of the cropped portion
  const canvasCrop = document.createElement('canvas')
  canvasCrop.width = 60
  canvasCrop.height = 60
  const ctxCrop = canvasCrop.getContext('2d')

  // Draw the cropped portion onto the new canvas
  ctxCrop.drawImage(img, sx, sy, croppedWidth, croppedHeight, 0, 0, 60, 60)
  const resizedPng = canvasCrop.toDataURL('image/png')
  return resizedPng
}

export const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => resolve(fileReader.result)
    fileReader.readAsDataURL(file)
  })

export const getContrastingColor = (color) => {
  // Remove the '#' character if it exists
  const hex = color.replace('#', '')

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  // Return black or white depending on the brightness
  return brightness > 128 ? 'black' : 'white'
}

// useOutsideClick custom hook
export const useOutsideClick = (callback) => {
  const ref = useRef()
  const exceptions = ['cart-button', 'cart-button-svg', 'num-counter']
  useEffect(() => {
    const handleClick = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !exceptions.includes(event.target.parentElement.id) &&
        !exceptions.includes(event.target.parentElement.className)
      ) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])

  return ref
}
