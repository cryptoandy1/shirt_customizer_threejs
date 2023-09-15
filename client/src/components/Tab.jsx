import { useSnapshot } from 'valtio'
import Tooltip from './Tooltip'
import state from '../store'

const Tab = ({ tab, isFilterTab, isEditorTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state)
  const tooltips = {
    colorpicker: 'Pick custom color',
    filepicker: 'Choose file',
    aipicker: 'Generate authentic design with DALL.E',
    logoShirt: 'Apply/Delete Logo',
    stylishShirt: 'Apply/Delete full pattern',
    downloadShirt: 'Download model png',
    saveImage: 'Download source png for later use',
    addToCart: 'Add to cart',
  }
  const activeStyles =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: 'transparent', opacity: 1 }

  return (
    <Tooltip text={tooltips[tab.name]} isEditorTab={isEditorTab}>
      <div
        key={tab.name}
        className={`tab-btn ${isFilterTab ? 'rounded-full' : 'rounded-4'}`}
        onClick={handleClick}
        style={activeStyles}
      >
        <img
          src={tab.icon}
          alt={tab.name}
          className={`${
            isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'
          }`}
        />
      </div>
    </Tooltip>
  )
}

export default Tab
