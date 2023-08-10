import React from 'react'

const Stars: React.FC<{ value: number | undefined, numberOfRatings?: number }> = ({ value, numberOfRatings }) => {
  if (value == null) {
    return (
      <p>
        No rating
      </p>
    )
  }

  const progress = value / 5

  return (
    <div>
      <div style={{
        width: '100%',
        height: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#ccc',
        color: '#fff',
        position: 'relative'
      }}>
        <div style={{
          width: progress * 100 + '%',
          height: '100%',
          backgroundColor: 'orange',
        }}>
        </div>
        <div style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          fontWeight: 'bold'
        }}>
          {Math.round(progress * 5 * 100) / 100}
        </div>
      </div >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        color: '#999',
        fontSize: 12
      }}>
        {numberOfRatings && 'Check-ins: ' + numberOfRatings}
      </div>
    </div>
  )
}

export default Stars
