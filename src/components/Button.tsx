import React from 'react'

import { theme } from '../lib/theme'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  outlined?: boolean
  style?: React.CSSProperties
  compact?: boolean
}

const Button: React.FC<ButtonProps> = ({ onClick, children, outlined = false, style, compact = false }) => {
  return (
    <div onClick={onClick} style={{
      ...style,
      marginTop: 8,
      backgroundColor: outlined ? theme.onPrimary : theme.primary,
      color: outlined ? theme.primary : theme.onPrimary,
      borderRadius: 6,
      border: '1px solid ' + theme.primary,
      padding: compact ? 4 : 10,
      fontWeight: 'bold',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {children}
    </div>
  )
}

export default Button
