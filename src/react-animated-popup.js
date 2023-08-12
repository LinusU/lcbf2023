import React, { useState, useEffect, useLayoutEffect } from 'react'

const ContainerStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100
}

function Popup ({ children, visible, onClose, animationDuration = 100, style, className }) {
  const [firstTimeSetup, setFirstTimeSetup] = useState(true)
  const [animationState, setAnimationState] = useState(visible)
  const [displayNothing, setDisplayNothing] = useState(!visible)

  useLayoutEffect(() => {
    if (firstTimeSetup) return
    if (displayNothing) return
    // Fix to make sure the element has been rendered before we start the animation otherwise react might execute before doing a re-render
    window.setTimeout(() => {
      setAnimationState(true)
    }, 1)
  }, [displayNothing])

  useEffect(() => {
    setFirstTimeSetup(false)
    if (firstTimeSetup) return

    if (visible) {
      setDisplayNothing(false)
    } else {
      if (displayNothing === false) {
        setAnimationState(false)
        window.setTimeout(() => {
          setDisplayNothing(true)
        }, animationDuration)
      }
    }
  }, [visible, animationDuration])

  if (displayNothing) return null

  const PromptStyle = {
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    maxWidth: 400,
    boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.2)',
    zIndex: 100,
    cursor: 'default',
    transition: animationDuration + 'ms',
    opacity: animationState ? 1 : 0,
    transform: animationState ? 'scale(1)' : 'scale(0.9)'
  }

  return React.createElement(
    'div',
    { onClick: onClose, style: ContainerStyle },
    React.createElement(
      'div',
      {
        onClick: (e) => e.stopPropagation(),
        style: { ...PromptStyle, ...style },
        className: className
      },
      children
    )
  )
}

export default Popup
