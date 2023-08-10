import React, { useMemo } from 'react'
import sortOn from 'sort-on'
import Fuse from 'fuse.js'
import { HStack } from 'react-stacked'

import { BeerStyle, Beer as BeerType } from '../data'
import { useSearchTerm, useSessionFilter, useSortCriteria, useSortOrder, useStyleFilter } from '../lib/storage'

import Beer from './Beer'
import RadioButton from './RadioButton'
import CheckBox from './CheckBox'
import Button from './Button'
import CollapsableSection from './CollapsableSection'
import Input from './Input'

export type SortCriteria = 'abv' | 'rating' | 'ratingCount' | 'nameLength' | 'noSpaceNameLength'
interface BeerListProps {
  beers: BeerType[]
}

const allBeerStyles: BeerStyle[] = ['barrel', 'belgian', 'bitter', 'cask', 'cider', 'dark', 'farmhouse', 'fruited', 'ipa', 'lager', 'other', 'pale', 'pastry', 'sour', 'strong', 'wheat']

const BeerList: React.FC<BeerListProps> = ({ beers }) => {
  const [sortOrder, setSortOrder] = useSortOrder()
  const [sortCriteria, setSortCriteria] = useSortCriteria()
  const sessionFilter = useSessionFilter()
  const styleFilter = useStyleFilter()
  const [searchTerm, setSearchTerm] = useSearchTerm()

  const handleResetFilter = () => {
    setSortOrder('desc')
    setSortCriteria('rating')
    sessionFilter.clear()
    styleFilter.clear()
    setSearchTerm('')
  }

  const filteredBeers = useMemo(() => {
    // Filter beer
    return beers.filter(beer => {
      const noSessionsSelected = sessionFilter.size == 0

      // If no sessions and no styles are selected, include all beers
      if (noSessionsSelected && styleFilter.size === 0) return true

      // Session filter
      const sessionMatch = (sessionFilter.has('friAm') && beer.fri_am) || (sessionFilter.has('friPm') && beer.fri_pm) || (sessionFilter.has('satAm') && beer.sat_am) || (sessionFilter.has('satPm') && beer.sat_pm)

      // If no styles are selected, return the session match result
      if (styleFilter.size === 0) return sessionMatch

      // Beer style filter
      const styleMatch = beer.styles.some(style => styleFilter.has(style))

      return (noSessionsSelected || sessionMatch) && styleMatch
    })
  }, [beers, sessionFilter, styleFilter])

  const fuse = useMemo(() => {
    return new Fuse(filteredBeers, {
      keys: ['name', 'brewery'],
      threshold: 0.2
    })
  }, [filteredBeers])

  const searchedBeers = useMemo(() => {
    if (searchTerm === '') return filteredBeers

    return fuse.search(searchTerm).map(result => result.item)
  }, [filteredBeers, fuse, searchTerm])

  const sortedBeers = useMemo(() => {
    const sortOrderPrefix = sortOrder === 'asc' ? '' : '-'
    const sortOrderMultiplier = sortOrder === 'asc' ? 1 : -1

    switch (sortCriteria) {
      case 'abv':
      case 'rating':
      case 'ratingCount':
        return sortOn(searchedBeers, [
          (beer: BeerType) => (sortCriteria === 'rating' && beer.rating == null)
            || (sortCriteria === 'ratingCount' && beer.ratingCount == null) ? 1 : 0,
          sortOrderPrefix.concat(sortCriteria)
        ])

      case 'nameLength':
        return sortOn(searchedBeers, (beer: BeerType) => beer.name.length * sortOrderMultiplier)

      case 'noSpaceNameLength':
        return sortOn(searchedBeers, (beer: BeerType) => Math.max(...beer.name.split(' ').map(word => word.length)) * sortOrderMultiplier)

      default:
        return sortOn(searchedBeers, [
          (beer: BeerType) => beer?.['rating'] == null ? 1 : 0,
          sortOrderPrefix.concat('rating')
        ])
    }
  }, [searchedBeers, sortCriteria, sortOrder])

  return (
    <div>
      <div style={{ backgroundColor: '#efefef', fontFamily: 'sans-serif' }}>
        <HStack paddingHorizontal={20} paddingVertical={8} width='100%'>
          <Button onClick={handleResetFilter} outlined>Clear filters</Button>
        </HStack>

        <div style={{ gap: 12, padding: 20, display: 'flex', flexDirection: 'column' }}>
          <div>

            <p><b>Sort</b></p>

            <CollapsableSection title='Sort Criteria'>
              <RadioButton checked={sortCriteria === 'rating'} onChange={() => setSortCriteria('rating')} title='Untappd rating' />
              <RadioButton checked={sortCriteria === 'abv'} onChange={() => setSortCriteria('abv')} title='Alcohol % by volume (%ABV)' />
              <RadioButton checked={sortCriteria === 'ratingCount'} onChange={() => setSortCriteria('ratingCount')} title='Number of check-ins' />
              <RadioButton checked={sortCriteria === 'nameLength'} onChange={() => setSortCriteria('nameLength')} title='Name length' />
              <RadioButton checked={sortCriteria === 'noSpaceNameLength'} onChange={() => setSortCriteria('noSpaceNameLength')} title='Longest word in name' />
            </CollapsableSection>

            <CollapsableSection title='Sort Order'>
              <HStack>
                <Button compact style={{ marginRight: 6 }} onClick={() => setSortOrder('asc')} outlined={sortOrder !== 'asc'}>Asc</Button>
                <Button compact onClick={() => setSortOrder('desc')} outlined={sortOrder !== 'desc'}>Desc</Button>
              </HStack>
            </CollapsableSection>
          </div>

          <div>
            <p><b>Filter</b></p>

            <CollapsableSection title='Sessions'>
              <CheckBox checked={sessionFilter.has('friAm')} onChange={() => sessionFilter.has('friAm') ? sessionFilter.delete('friAm') : sessionFilter.add('friAm')} title='Friday Afternoon' />
              <CheckBox checked={sessionFilter.has('friPm')} onChange={() => sessionFilter.has('friPm') ? sessionFilter.delete('friPm') : sessionFilter.add('friPm')} title='Friday Evening' />
              <CheckBox checked={sessionFilter.has('satAm')} onChange={() => sessionFilter.has('satAm') ? sessionFilter.delete('satAm') : sessionFilter.add('satAm')} title='Saturday Afternoon' />
              <CheckBox checked={sessionFilter.has('satPm')} onChange={() => sessionFilter.has('satPm') ? sessionFilter.delete('satPm') : sessionFilter.add('satPm')} title='Saturday Evening' />
            </CollapsableSection>


            <CollapsableSection title='Beer Style'>
              {
                allBeerStyles.map(style => (
                  <CheckBox
                    key={style}
                    checked={styleFilter.has(style)}
                    onChange={() => styleFilter.toggle(style)}
                    title={style.charAt(0).toUpperCase() + style.slice(1)}
                  />
                ))
              }
            </CollapsableSection>
          </div>

          <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder='Search...' style={{ marginTop: 10 }} />
        </div>

        {sortedBeers.map(b => <Beer key={b.id} beer={b} />)}
      </div >
    </div >
  )
}

export default BeerList
