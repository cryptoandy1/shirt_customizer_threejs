import CustomButton from './CustomButton'

const FilePicker = ({ file, setFile, readFile, setState }) => {
  const handleReset = () => {
    setState({
      colorpicker: false,
      filepicker: false,
      aipicker: false,
    })
    setFile('')
    readFile('reset')
  }

  const handlePick = (type) => {
    setState({
      colorpicker: false,
      filepicker: false,
      aipicker: false,
    })
    if (file) {
      return readFile(type)
    }
    return ''
  }

  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>
        <p className="mt-2 text-gray-500 text-sm trancated">
          {file === '' ? 'No file selected' : file.name}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => handlePick('logo')}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => handlePick('full')}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Reset"
          handleClick={handleReset}
          customStyles="text-xs"
        />
      </div>
    </div>
  )
}

export default FilePicker
