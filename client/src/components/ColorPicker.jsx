import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../store'
import { useState } from 'react'
import CustomButton from './CustomButton'

const ColorPicker = () => {
  const snap = useSnapshot(state)

  return (
    <div className="col-pic">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (state.color = color.hex)}
        presetColors={[
          '#000',
          '#fff',
          '#F5FDC6',
          '#F5C396',
          '#D0B17A',
          '#A89F68',
          '#41521F',
          '#6A0136',
          '#BFAB25',
          '#B81365',
          '#026C7C',
          '#055864',
          '#764248',
          '#DDA3B2',
          '#FFADC6',
          '#E3C5BB',
          '#2C1A1D',
          '#6C534E',
        ]}
      />
    </div>
  )
}

export default ColorPicker
