import React from 'react'

interface InputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    style?: React.CSSProperties
    placeholder: string
}

const Input: React.FC<InputProps> = ({ onChange, value, style, placeholder }) => {
    return (
        <input
            style={{
                ...style,
                borderRadius: 50,
                padding: 10,
                border: '0 solid',
                boxShadow: 'rgba(0, 0, 0, 0.12) 0px 8px 24px',
                flex: 1,
                display: 'flex',
                fontSize: 16
            }}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={(e) => {
                e.target.select()
            }}
        >
        </input>
    )
}

export default Input
