export type Level = 'vaults' | 'quayside'

export interface Location {
  name: string
}

export const locations: Record<Level, Location[]> = {
  vaults: [
    { name: 'NV1' },
    { name: 'NV2' },
    { name: 'NV3' },
    { name: 'NV4' },
    { name: 'NV5' },
    { name: 'NV6' },
    { name: 'SV1' },
    { name: 'SV2' },
    { name: 'SV5' },
    { name: 'SV6' },
    { name: 'SV7' },
    { name: 'Porter\'s Walk North' },
    { name: 'North Bandstand' },
    { name: 'Porter\'s Walk South' },
    { name: 'Central Staircase' },
    { name: 'North Vault Courtyard' },
    { name: 'North Fountain' },
    { name: 'South Fountain' },
    { name: 'Hogshead Passage' },
  ],
  quayside: [
    { name: 'Little Gallery' },
    { name: 'Quayside Walkway' },
    { name: 'West Mall Bridge' },
    { name: 'QS1' },
    { name: 'QS3' },
    { name: 'QS7' },
    { name: 'Food Court' },
  ],
}

export function getBreweryLocation(breweryName: string): Location {
  switch (breweryName) {
    // Vaults level

    case 'Two Flints':
    case 'Sureshot  Brewing Company':
    case 'Holy Goat':
    case 'Holy Goat Brewing':
    case 'Little Monster':
    case 'We are Beer Club':
    case 'DEYA':
    case 'Duration Brewing':
    case 'Thornbridge Brewery':
    case 'Pressure Drop':
    case 'Northern Monk':
    case 'Burning Sky':
    case 'Track Brewery':
      return locations.vaults.find(location => location.name === 'NV1')!

    case 'Budweiser Budvar':
      return locations.vaults.find(location => location.name === 'NV2')!

    case 'Chouffe Brewery':
      return locations.vaults.find(location => location.name === 'NV3')!

    case 'Brew By Numbers':
    case 'Kyro Distillery':
      return locations.vaults.find(location => location.name === 'NV4')!

    case 'RedLeg':
      return locations.vaults.find(location => location.name === 'NV5')!

    case 'Brixton Brewery':
    case 'The Gipsy Hill Brewing':
    case 'Indian Brewery':
    case 'Timothy Taylor\'s':
    case 'Haacht Brewery':
    case 'Compass Box':
      return locations.vaults.find(location => location.name === 'NV6')!

    case 'O\'Hara\'s Brewing':
    case 'ABK':
    case 'Dartsee':
      return locations.vaults.find(location => location.name === 'SV1')!

    case 'Forest Road':
      return locations.vaults.find(location => location.name === 'SV2')!

    case 'Favela Cerveja':
      return locations.vaults.find(location => location.name === 'SV5')!

    case 'SALT Beer Factory':
      return locations.vaults.find(location => location.name === 'SV6')!

    case 'Amundsen Brewery':
    case 'Amundsen Pastry World':
      return locations.vaults.find(location => location.name === 'SV7')!

    case 'Pretty Decent Beer Co':
    case 'Hackney Church Brewery':
    case 'The Wine Importers':
    case 'The Mad Butcher':
    case 'Jiddler\'s Tipple':
    case 'Green Duck':
    case 'Three Locks Brewing Co':
    case 'Mammoth Beer':
    case 'Siren Craft Brew':
    case 'Round Corner Brewing':
    case 'UnBarred Brewery':
    case 'Mash Gang':
    case 'Beyond Belief Brewing':
    case '360 Degree Brewing':
    case 'The Three Legs Brewing Co.':
    case 'The Three Legs Brewing Co. ':
      return locations.vaults.find(location => location.name === 'Porter\'s Walk North')!

    case 'The Goodness Brew Co':
    case 'Mikkeller':
    case 'MIkkeller Brewpub London':
    case 'Fierce Beer':
    case 'Pimentae':
    case 'North Brewing Co.':
    case 'Utopian Brewing':
    case 'New Bristol Brewery':
    case 'Dugges':
    case 'Frontaal Brewery':
    case 'Galway Bay':
    case 'Basqueland Brewing':
      return locations.vaults.find(location => location.name === 'North Bandstand')!

    case 'Yonder Brewing':
    case 'The Five Points Brewing Company':
    case 'Pillars Brewery':
    case 'The Newt in Somerset':
    case '40FT':
      return locations.vaults.find(location => location.name === 'Porter\'s Walk South')!

    case 'Real Handful':
    case 'Jack Links':
    case 'Botivo':
    case 'Serious Pig':
      return locations.vaults.find(location => location.name === 'Central Staircase')!

    case 'Verdant Brewing Co.':
    case 'Phantom Brewing Co.':
    case 'Beak Brewery':
    case 'Kernel Brewery':
    case 'Bodha Drinks':
    case 'Pastore Brewing & Blending':
    case 'Floc':
    case 'Anspach & Hobday':
    case 'Arbor Ales':
    case 'Attic Brew Co':
      return locations.vaults.find(location => location.name === 'North Vault Courtyard')!

    case 'Hackney Brewery':
    case 'Elusive Brewing':
    case 'Partizan Brewing':
    case 'Queer Brewing':
    case 'Abyss Brewing':
    case 'Exale':
    case 'Brew York':
    case 'Hepworth':
    case 'On Cloud Wine':
    case 'Go Mate Drinks':
      return locations.vaults.find(location => location.name === 'North Fountain')!

    case 'Turning Point Brew Co':
    case 'Signature Brew':
    case 'Lost and Grounded':
    case 'Big Smoke Brew Co':
      return locations.vaults.find(location => location.name === 'South Fountain')!

    case 'Craft Beerings':
    case 'Battle of the breweries':
    case 'Kotinos Foods':
    case 'Nonna Tonda':
      return locations.vaults.find(location => location.name === 'Hogshead Passage')!

    // Quayside level

    case 'Gosnells of London':
    case 'Orbit Beers':
    case 'Magic Rock Brewing':
    case 'Fourpure':
    case 'Black lines':
    case 'Moonwake':
    case 'The Cocktail Co':
    case 'Kraken':
    case 'SXOLLIE':
    case 'Black Iris':
    case 'Black Iris Brewery':
    case 'Alpha Delta':
    case 'Alpha Delta Brewing':
    case 'Bianca Road':
    case 'Luda Brew co':
    case 'Luda Brewing Co.':
    case 'Talking Tides':
    case 'Talking Tides Brew Co':
    case 'Club Soda (no/lo)':
      return locations.quayside.find(location => location.name === 'Little Gallery')!

    case 'Vintro Bar':
    case 'CHICK\'IN\'SOURS':
    case 'Meltdown Burgers':
      return locations.quayside.find(location => location.name === 'Quayside Walkway')!

    case 'Stone & Wood':
      return locations.quayside.find(location => location.name === 'West Mall Bridge')!

    case 'Sullivan\'s Brewing Company':
    case 'Brick Brewery':
    case 'Howling Hops':
    case 'Seven Island':
    case 'Seven Island Brewery':
    case 'Tempest':
    case 'Tempest Brewing Co.':
    case 'Double-Barrelled':
    case 'JimBrew':
    case 'Dark Revolution':
    case 'Dark Revolution ': // yes, with a space
    case 'Great Beyond':
    case 'Great Beyond Brewing Company':
    case 'Virginia Beer Co (USA)':
    case 'The Virginia Beer Company':
    case 'Hop the Pond (USA)':
    case 'Drink Texas - Hop The Pond':
    case 'Drink Texas - Hop The Pond ':
    case 'Stone Brewing':
    case 'Stone Brewing (USA)':
    case 'Spotlight Bar':
    case 'Freedom Brewery':
    case 'The Sexton Whiskey':
    case 'Dalston\'s Soda Company':
    case 'Ploom':
      return locations.quayside.find(location => location.name === 'QS1')!

    case 'Mondo Brewery':
    case 'Mondo Brewing Company':
    case 'Umbrella Cider':
    case 'Umbrella London':
    case 'Renegade Brewery':
    case 'XyloR':
    case 'Xylo Brewing Ltd':
    case 'Hammerton':
    case 'Hammerton Brewery  ': // yes, with two spaces
      return locations.quayside.find(location => location.name === 'QS3')!

    case 'Affinity Brewery (LBA BAR)':
    case 'American Brewers Association (USA)':
    case 'Brockley Brewery (LBA BAR)':
    case 'By The Horns (LBA BAR)':
    case 'Distortion Brewing (LBA BAR)':
    case 'East London Brewing (LBA BAR)':
    case 'Friendship Adventure (LBA BAR)':
    case 'Gravity Well Brewing (LBA BAR)':
    case 'Great Beyond (LBA BAR)':
    case 'Hammerton Brewery (LBA BAR)':
    case 'London Beer Lab (LBA BAR)':
    case 'London Brewers Alliance':
    case 'Muswell Hillbilly Brewers (LBA BAR)':
    case 'ORA (LBA BAR)':
    case 'Southwark Brewery (LBA BAR)':
    case 'Tap East (LBA BAR)':
    case 'Timmermans (BEL)':
    case 'Timmermans':
    case 'Wimbledon Brewery (LBA BAR)':
    case 'Zerodegrees (LBA BAR)':
      return locations.quayside.find(location => location.name === 'QS7')!

    case 'Braybrooke Beer Co':
      return locations.quayside.find(location => location.name === 'Food Court')!

    case 'Only With Love':
      return { name: 'Who knows?' }

    case 'Vibrant Forest Brewery':
      return { name: 'Jag vet inte?' }

    case 'London Brewing Company':
      return { name: 'Vet ej tyvärr' }

    case 'BRULO':
      return { name: 'Oklart' }

    case 'Neckstamper':
      return { name: 'Ehhhhh??' }

    default:
      return { name: '???' }
  }
}
