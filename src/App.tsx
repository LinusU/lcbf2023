import React from 'react'
import { VStack } from 'react-stacked'

import BeerList from './components/BeerList'
import { allBeers } from './data'

const App: React.FC = () => {
  return (
    <VStack>
      <BeerList beers={allBeers} />
    </VStack>
  )
}

export default App
