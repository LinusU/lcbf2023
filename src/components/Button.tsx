import React from 'react'
import Bounce, { BounceHandle } from './Bounce'
import { theme } from '../lib/theme'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  outlined?: boolean
  style?: React.CSSProperties
  compact?: boolean
  animated?: boolean
}

const Button: React.FC<ButtonProps> = ({ onClick, children, outlined = false, style, compact = false, animated = false }) => {
  const bounceRef = React.useRef<BounceHandle>(null)

  const ButtonElement = (<div onClick={() => {
    if (animated) {
      bounceRef.current?.bounce()
    }
    onClick()
  }} style={{
    ...style,
    alignItems: 'center',
    backgroundColor: outlined ? theme.onPrimary : theme.primary,
    border: '1px solid ' + theme.primary,
    borderRadius: 6,
    color: outlined ? theme.primary : theme.onPrimary,
    cursor: 'pointer',
    display: 'flex',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 8,
    minHeight: compact ? undefined : 40,
    padding: compact ? 4 : '0px 20px',
    textAlign: 'center',
  }}>
    {children}
  </div>)

  if (animated) {
    return (
      <Bounce ref={bounceRef}>
        {ButtonElement}
      </Bounce>
    )
  }

  return (
    ButtonElement
  )
}

export default Button
