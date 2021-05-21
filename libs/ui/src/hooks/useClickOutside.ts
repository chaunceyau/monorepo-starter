import React from 'react'

export function useClickOutside(
  elRef: React.MutableRefObject<any>,
  callback: () => void
) {
  const callbackRef = React.useRef<any>()
  callbackRef.current = callback

  React.useEffect(() => {
    function handleClickOutside(e: any) {
      // is click outside provided elRef
      if (!elRef?.current?.contains(e.target) && callbackRef.current) {
        callbackRef.current(e)
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [elRef, callbackRef])
}
