import React, { ChangeEvent, useState } from 'react'

interface RadioButtonProps {
  checked: boolean
  onChange: (checked: boolean) => void
  title: string
}

const RadioButton: React.FC<RadioButtonProps> = ({ checked, onChange, title }) => {
  const [id] = useState(Math.random().toFixed(12))
  const handleRadioButtonChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <div style={{ flexDirection: 'row' }}>
      <label htmlFor={id}>
        <input
          type="radio"
          id={id}
          checked={checked}
          onChange={handleRadioButtonChange}
        />

        {title}
      </label>
    </div>
  )
}

export default RadioButton
