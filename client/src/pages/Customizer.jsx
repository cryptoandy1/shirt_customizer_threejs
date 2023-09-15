import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import { useSnapshot } from 'valtio'
import config from '../config/config'
import state from '../store'
import { download } from '../assets'
import { downloadCanvasToImage, reader, canvasToPng } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import {
  AIPicker,
  ColorPicker,
  FilePicker,
  Header,
  Tab,
  Cart,
  SaveImagePick,
} from '../components'

const Customizer = () => {
  const snap = useSnapshot(state)

  const [file, setFile] = useState('')

  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)

  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setFilterEditorTab] = useState({
    logoShirt: true,
    stylishShirt: false,
    saveImage: false,
  })
  const [tabsStateOpen, setTabsStateOpen] = useState({
    colorpicker: false,
    filepicker: false,
    aipicker: false,
  })

  const [saveImageShow, setSaveImageShow] = useState(false)
  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return tabsStateOpen[activeEditorTab] && <ColorPicker />
      case 'filepicker':
        return (
          tabsStateOpen[activeEditorTab] && (
            <FilePicker
              file={file}
              setFile={setFile}
              readFile={readFile}
              setState={setTabsStateOpen}
            />
          )
        )
      case 'aipicker':
        return (
          tabsStateOpen[activeEditorTab] && (
            <AIPicker
              prompt={prompt}
              setPrompt={setPrompt}
              generatingImg={generatingImg}
              handleSubmit={handleSubmit}
            />
          )
        )

      default:
        return null
    }
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert('Please enter a prompt')

    try {
      setGeneratingImg(true)
      const response = await fetch(config.development.backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      const data = await response.json()
      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab('')
      tabClickHandler('aipicker')
    }
  }

  const handleDecals = (type, result) => {
    const decalTypes = DecalTypes[type]
    if (type === 'reset') {
      state.logoDecal = result
      state.fullDecal = result
      setFilterEditorTab({
        logoShirt: true,
        stylishShirt: false,
        saveImage: false,
      })
      setSaveImageShow(false)
      state.isLogoTexture = true
      state.isFullTexture = false
      return null
    } else {
      state[decalTypes.stateProperty] = result
    }

    if (!activeFilterTab[decalTypes.filterTab]) {
      handleActiveFilterTab(decalTypes.filterTab)
    }
  }

  const handleActiveFilterTab = async (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName]
        break
      case 'downloadShirt':
        downloadCanvasToImage()
        break
      case 'addToCart':
        let repeatingItem = false
        const img = await canvasToPng()
        // if an item with same properties is already in cart - increase it's 'num' by 1
        snap.cartInside.forEach((item) => {
          if (
            item.logo === snap.logoDecal &&
            item.full === snap.fullDecal &&
            item.color === snap.color &&
            item.isLogo === snap.isLogoTexture &&
            item.isFullTexture === snap.isFullTexture
          ) {
            state.cartInside[snap.cartInside.indexOf(item)].num += 1
            repeatingItem = true
          }
        })
        // else: add new item to cart
        if (!repeatingItem) {
          const cartItemObject = {
            id: uuidv4(),
            image: img,
            isLogo: snap.isLogoTexture,
            isFullTexture: snap.isFullTexture,
            logo: snap.logoDecal,
            full: snap.fullDecal,
            color: snap.color,
            num: 1,
          }
          state.cartInside.push(cartItemObject)
        }
        break

      case 'saveImage':
        setSaveImageShow(() => !saveImageShow)
        break
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
        break
    }
    // settting activeFilterTab Array
    setFilterEditorTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      }
    })
  }

  const readFile = (type) => {
    if (type === 'reset') {
      handleDecals(type, './threejs.png')
      setActiveEditorTab('')
    } else {
      reader(file).then((result) => {
        handleDecals(type, result)
        setActiveEditorTab('')
      })
    }
  }

  const tabClickHandler = (tabName) => {
    setActiveEditorTab(tabName)
    // first reset states of all Tabs to false (their opened=closed states) except for one which is clicked
    const tabs = ['colorpicker', 'filepicker', 'aipicker'].filter(
      (t) => t !== tabName
    )
    const tabsWithUpdatedStates = {}
    tabs.forEach((t) => (tabsWithUpdatedStates[t] = false))
    setTabsStateOpen({
      ...tabsWithUpdatedStates,
      [tabName]: !tabsStateOpen[tabName],
    })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen landsc-xs:flex landsc-xs:flex-wrap landsc-xs:content-end">
              <div
                className="editortabs-container tabs"
                style={{ backgroundColor: snap.color }}
              >
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => tabClickHandler(tab.name)}
                    isEditorTab={true}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <Header />
          <AnimatePresence>
            {snap.isCartOpen && snap.cartInside.length && (
              <Cart cartInside={snap.cartInside} />
            )}
          </AnimatePresence>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab={
                  tab.name === 'downloadShirt' || tab.name === 'addToCart'
                    ? false
                    : true
                }
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
          {saveImageShow && activeFilterTab.saveImage && <SaveImagePick />}
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
