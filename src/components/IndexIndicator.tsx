import React from 'react'

const IndexIndicator: React.FC<{ value: boolean[] }> = ({ value }) => {
  const amount = value.length

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: 5
    }}>
      {
        value.map((v, idx) => {
          return (
            <div
              key={`${v}${idx}`}
              style={{
                display: 'flex',
                borderRadius: 6,
                backgroundColor: v === true ? 'orange' : '#ccc',
                height: 6,
                width: 90 / amount + '%'
              }}
            />
          )
        })
      }
    </div >
  )
}

export default IndexIndicator
