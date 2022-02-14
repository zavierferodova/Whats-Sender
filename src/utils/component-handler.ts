import { ChangeEvent, SetStateAction } from 'react'

/**
 * Handle react component set value to state
 * @param value
 * @param dispatch
 */
function handleValueChange <T> (
  value: T,
  dispatch: (value: SetStateAction<T>) => void
) {
  dispatch(value)
}

/**
 * Handle onChange React input component trigger
 * @param event - input event
 * @param dispatch - state dispatcher function
 * @param maxLength - maximum input length
 */
function handleInputChange (
  event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,
  dispatch: (value: any) => void,
  maxLength = 0
) {
  if (maxLength > 0) {
    const str = `${event.target.value}`
    if (str.length <= maxLength) {
      dispatch(event.target.value)
    }
  } else {
    dispatch(event.target.value)
  }
}

/**
 * Handle onChange React file component trigger
 * @param event - input file event
 * @param dispatch - state dispatcher
 */
function handleInputFileChange (
  event: ChangeEvent<HTMLInputElement>,
  dispatch: (file: SetStateAction<File|null>) => void
) {
  const files = event.target.files
  if (files) {
    if (files.length > 0) {
      dispatch(files[0])
      return
    }
  }

  dispatch(null)
}

/**
 * Handle onChange React file component trigger with multiple files input
 * @param event - file input event
 * @param dispatch - state dispatcher
 */
function handleInputFilesChange (
  event: ChangeEvent<HTMLInputElement>,
  dispatch: (file: SetStateAction<FileList>) => void
) {
  const files = event.target.files
  if (files) {
    dispatch(files)
  }
}

/**
 * Set state for React component ref
 * @param element - JSX element
 * @param dispatch - state dispatcher
 */
function refCallback <T> (
  element: T,
  dispatch: (element: SetStateAction<T>) => void
) {
  dispatch(element)
}

export {
  handleValueChange,
  handleInputChange,
  handleInputFileChange,
  handleInputFilesChange,
  refCallback
}
