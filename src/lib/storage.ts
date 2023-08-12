/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from 'react'

import { BeerStyle } from '../data'
import { SortCriteria } from '../components/BeerList'
import { Location } from './location'

type GlobalPersistedVariable<T> = () => [T, (value: T) => void]

export function createGlobalPersistedVariable<T> (initialValue: T, keyName: string): GlobalPersistedVariable<T> {
  let currentValue: T = initialValue
  const listeners = new Set<(value: T) => void>()

  const raw = localStorage.getItem(keyName)

  if (raw != null) {
    currentValue = JSON.parse(raw)
  }

  function setValue (value: T): void {
    localStorage.setItem(keyName, JSON.stringify(value))
    currentValue = value
    listeners.forEach(fn => fn(value))
  }

  return function hook () {
    const [current, setCurrent] = useState(currentValue)

    useEffect(() => {
      listeners.add(setCurrent)

      return () => {
        listeners.delete(setCurrent)
      }
    }, [setCurrent])

    return [current, setValue]
  }
}

type GlobalPersistedSet<T> = () => {
  add: (value: T) => void,
  clear: () => void,
  delete: (value: T) => void,
  has: (value: T) => boolean,
  size: number,
  toggle: (value: T) => void,
}

function createGlobalPersistedSet<T> (keyName: string): GlobalPersistedSet<T> {
  const upstream = createGlobalPersistedVariable<T[]>([], keyName)

  return function hook () {
    const [array, setArray] = upstream()

    return {
      add (value) {
        if (!array.includes(value)) {
          setArray([...array, value])
        }
      },
      clear () {
        setArray([])
      },
      delete (value) {
        if (array.includes(value)) {
          setArray(array.filter(v => v !== value))
        }
      },
      has (value) {
        return array.includes(value)
      },
      get size () {
        return array.length
      },
      toggle (value) {
        if (array.includes(value)) {
          setArray(array.filter(v => v !== value))
        } else {
          setArray([...array, value])
        }
      }
    }
  }
}

export const useCheckedIn = createGlobalPersistedSet<string>('checkedIn')
export const useSavedForLater = createGlobalPersistedSet<string>('savedForLater')
export const useSessionFilter = createGlobalPersistedSet<'friAm' | 'friPm' | 'satAm' | 'satPm'>('sessionFilter')
export const useStyleFilter = createGlobalPersistedSet<BeerStyle>('styleFilter')
export const useLocationFilter = createGlobalPersistedSet<Location['name']>('locationFilter')

export const useSearchTerm = createGlobalPersistedVariable<string>('', 'searchTerm')
export const useSortCriteria = createGlobalPersistedVariable<SortCriteria>('rating', 'sortCriteria')
export const useSortOrder = createGlobalPersistedVariable<'asc' | 'desc'>('desc', 'sortOrder')
