import { getContrastingColor } from '../config/helpers'
import state from '../store'
import { useSnapshot } from 'valtio'
import { downloadPngImage } from '../config/helpers'

const SaveImagePick = () => {
  const snap = useSnapshot(state)
  return (
    <div className="save-image-container">
      <div
        style={{
          backgroundColor: getContrastingColor(snap.color),
          color: snap.color,
          opacity: 0.8,
        }}
        className="save-image-content glassmorphism text-sm rounded-lg"
      >
        <h3
          className="save-png-options"
          onClick={() => downloadPngImage(snap.logoDecal)}
        >
          Save Logo as .png
        </h3>
        <h3
          className="save-png-options"
          onClick={() => downloadPngImage(snap.fullDecal)}
        >
          Save Pattern as .png
        </h3>
      </div>
    </div>
  )
}

export default SaveImagePick
