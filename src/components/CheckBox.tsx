import React, { ChangeEvent, useState } from 'react'

interface CheckBoxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  title: string
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, title }) => {
  const [id] = useState(Math.random().toFixed(12))
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <div style={{ flexDirection: 'row' }}>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  )
}

export default CheckBox
