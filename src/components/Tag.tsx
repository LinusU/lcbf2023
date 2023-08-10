const Tag: React.FC<{ title: string }> = ({ title }) => {
  let color = 'orange'

  switch (title) {
    case 'sour':
      color = 'red'
      break;
    case 'ipa':
      color = 'green'
      break;
    case 'pastry':
      color = 'brown'
      break;
    case 'stout':
      color = 'black'
      break;
    case 'fruited':
      color = 'crimson'
      break;
    case 'dark':
      color = '#111'
      break;
    default:
      break;
  }

  return (
    <div style={{
      padding: 4,
      paddingLeft: 10,
      paddingRight: 10,
      border: '1px solid ' + color,
      borderRadius: 20,
      color: color,
      marginRight: 5,
      marginBottom: 5
    }}>
      {title}
    </div>
  )
}

export default Tag
