import React, { useState, useContext, useReducer, useEffect } from 'react'
const DeviceContext = React.createContext(null)

enum ACTION_TYPE {
  SET_DEVICE,
}
type Device = {
  status: 'loading' | 'success'
  value: 'desktop' | 'mobile'
}

function deviceReducer(
  state: Device,
  action: { payload: Device['value']; type: ACTION_TYPE }
): Device {
  switch (action.type) {
    case ACTION_TYPE.SET_DEVICE:
      return { value: action.payload, status: 'success' }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function DeviceProvider({ children }) {
  const [state, dispatch] = useReducer(deviceReducer, {
    value: 'desktop',
    status: 'loading',
  })
  useEffect(() => {
    const handleResize = () => {
      dispatch({
        payload: window.innerWidth < 768 ? 'mobile' : 'desktop',
        type: ACTION_TYPE.SET_DEVICE,
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <DeviceContext.Provider value={state}>{children}</DeviceContext.Provider>
  )
}

function useDevice() {
  const context = useContext<Device>(DeviceContext)
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider')
  }
  return context
}

export { DeviceProvider, useDevice }
