import React from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsPinMapFill } from 'react-icons/bs'
import { FaUntappd, FaCheck } from 'react-icons/fa'

import { Beer as BeerType } from '../data.ts'
import { theme } from '../lib/theme.ts'
import { useCheckedIn, useSavedForLater } from '../lib/storage.ts'

import IndexIndicator from './IndexIndicator.tsx'
import Stars from './Stars.tsx'
import Tag from './Tag.tsx'
import Button from './Button.tsx'
import { getBreweryLocation } from '../lib/location.ts'

interface BeerProps {
    beer: BeerType
}

const Beer: React.FC<BeerProps> = ({ beer }) => {
    const sessions = [beer.fri_am, beer.fri_pm, beer.sat_am, beer.sat_pm]
    const checkedIn = useCheckedIn()
    const savedForLater = useSavedForLater()

    const goToBeer = () => {
        if (beer.untappd == null || beer.untappdAppUrl == null) {
            alert('No URL for this beer!')
            return
        }

        checkedIn.add(beer.untappd)
        window.open(beer.untappdAppUrl)
    }

    const toggleHasHad = () => {
        if (beer.untappd == null) {
            alert('No URL for this beer!')
            return
        }

        if (checkedIn.has(beer.untappd)) {
            checkedIn.delete(beer.untappd)
        } else {
            checkedIn.add(beer.untappd)
        }
    }

    const toggleSavedForLater = () => {
        if (beer.untappd == null) {
            alert('No URL for this beer!')
            return
        }

        if (savedForLater.has(beer.untappd)) {
            savedForLater.delete(beer.untappd)
        } else {
            savedForLater.add(beer.untappd)
        }
    }

    const isSaved = beer.untappd == null ? false : savedForLater.has(beer.untappd)

    return (
        <div style={{
            padding: 20,
            fontFamily: 'sans-serif',
            wordBreak: 'normal',
            wordWrap: 'break-word',
            overflow: 'hidden',
            borderRadius: 10,
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
            margin: 10,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <img src={beer.image} style={{
                    height: 80,
                    width: 80,
                    display: 'flex',
                    flexShrink: 0,
                    marginRight: 20
                }} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                }}>
                    <h2 style={{ fontSize: 19, fontWeight: 'bold' }}>
                        {beer.name}
                    </h2>
                    <p>
                        {beer.brewery}
                    </p>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin: '6px 0'
                    }}>
                        <BsPinMapFill color={theme.primary}></BsPinMapFill>
                        <p style={{ marginLeft: 10 }}>{getBreweryLocation(beer.brewery).name}</p>
                    </div>
                    <p>
                        ABV: {beer.abv.toFixed(2)}%
                    </p>
                    <IndexIndicator value={sessions}></IndexIndicator>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        marginTop: 6
                    }}>
                        {beer.styles.map(s => {
                            return <Tag key={s} title={s}></Tag>
                        })}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginTop: 6
                    }}>
                    </div>
                </div>
            </div>
            <Stars value={beer.rating} numberOfRatings={beer.ratingCount}></Stars>

            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <Button onClick={goToBeer} style={{ flex: 1, marginRight: 5 }} outlined>
                    <p style={{ marginRight: 8 }}>Untappd</p><FaUntappd size={20} />
                </Button>
                <Button onClick={toggleHasHad} outlined={beer.untappd == null ? true : !checkedIn.has(beer.untappd)} style={{ marginRight: 5 }}>
                    <FaCheck />
                </Button>

                <Button onClick={toggleSavedForLater} outlined={!isSaved}>
                    {isSaved ? <AiFillHeart /> : <AiOutlineHeart />}
                </Button>
            </div>
        </div>
    )
}

export default Beer
