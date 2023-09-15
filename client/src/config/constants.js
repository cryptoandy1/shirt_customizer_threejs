import {
  swatch,
  fileIcon,
  ai,
  logoShirt,
  stylishShirt,
  download,
  cart,
  saveImage,
} from '../assets'

export const EditorTabs = [
  {
    name: 'colorpicker',
    icon: swatch,
  },
  {
    name: 'filepicker',
    icon: fileIcon,
  },
  {
    name: 'aipicker',
    icon: ai,
  },
]

export const FilterTabs = [
  {
    name: 'logoShirt',
    icon: logoShirt,
  },
  {
    name: 'stylishShirt',
    icon: stylishShirt,
  },
  {
    name: 'downloadShirt',
    icon: download,
  },
  {
    name: 'saveImage',
    icon: saveImage,
  },
  {
    name: 'addToCart',
    icon: cart,
  },
]

export const DecalTypes = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShirt',
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShirt',
  },

  reset: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShirt',
  },
}
