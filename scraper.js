import { parse } from 'csv-parse/sync'
import fs from 'fs'
import { load } from 'cheerio'
import get from 'simple-get'
import upstreamSlugify from 'slugify'

function slugify(string) {
  return upstreamSlugify(string, {
    lower: true,
    remove: /[*+~,.()'"!:@/#=?]/g,
  })
}

function fetch (url) {
  return new Promise((resolve, reject) => {
    get.concat({
      url,
      headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36' }
    }, (err, res, data) => {
      if (err) return reject(err)

      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`Server responded with ${res.statusCode}`))
      }

      resolve(String(data))
    })
  })
}

let data
try {
  data = fs.readFileSync('cache/LCBF-BEER-LIST-Sheet1-3-1.tsv', 'utf8')
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error
  }

  data = await fetch('https://club.wearebeer.com/wp-content/uploads/2023/08/LCBF-BEER-LIST-Sheet1-3-1.tsv')
  fs.writeFileSync('cache/LCBF-BEER-LIST-Sheet1-3-1.tsv', data)
}

const raw = parse(data, { delimiter: '\t' }).slice(3)
  .filter(row => (row[5] + row[6] + row[7] + row[8]) !== '')

const parsed = raw.map((row) => {
  let styles = []
  if (row[11].toLowerCase() === 'yes') styles.push('lager')
  if (row[12].toLowerCase() === 'yes') styles.push('pale')
  if (row[13].toLowerCase() === 'yes') styles.push('ipa')
  if (row[14].toLowerCase() === 'yes') styles.push('dark')
  if (row[15].toLowerCase() === 'yes') styles.push('sour')
  if (row[16].toLowerCase() === 'yes') styles.push('wheat')
  if (row[17].toLowerCase() === 'yes') styles.push('farmhouse')
  if (row[18].toLowerCase() === 'yes') styles.push('cask')
  if (row[19].toLowerCase() === 'yes') styles.push('bitter')
  if (row[20].toLowerCase() === 'yes') styles.push('pastry')
  if (row[21].toLowerCase() === 'yes') styles.push('belgian')
  if (row[22].toLowerCase() === 'yes') styles.push('strong')
  if (row[23].toLowerCase() === 'yes') styles.push('fruited')
  if (row[24].toLowerCase() === 'yes') styles.push('barrel')
  if (row[25].toLowerCase() === 'yes') styles.push('cider')
  if (row[26].toLowerCase() === 'yes') styles.push('other')

  return {
    id: row[3],
    brewery: row[0],
    name: row[2],
    untappd: row[4] === '' ? undefined : row[4],
    untappdAppUrl: row[4] === '' ? undefined : `untappd://beer/${row[4]}`,
    fri_am: row[5].toLowerCase() === 'yes',
    fri_pm: row[6].toLowerCase() === 'yes',
    sat_am: row[7].toLowerCase() === 'yes',
    sat_pm: row[8].toLowerCase() === 'yes',
    abv: Number(row[10].replace('%', '')),
    styles,
    gf: (row[27].toLowerCase() === 'yes'),
    non_alc: (row[28].toLowerCase() === 'yes'),
  }
})

for (const beer of parsed) {
  if (beer.untappd == null) continue

  let html
  try {
    html = fs.readFileSync(`cache/untappd-${beer.untappd}.html`, 'utf8')
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }

    let url = `https://untappd.com/b/${slugify(beer.brewery)}-${slugify(beer.name)}/${beer.untappd}`
    console.log('Want to fetch', url)
    fs.writeFileSync(`cache/untappd-${beer.untappd}.html`, await fetch(url))

    continue
  }

  const $ = load(html)

  beer.untappdUrl = $('meta[property="og:url"]').attr('content')
  beer.rating = Number($('.details [data-rating]').first().data('rating'))
  beer.ratingCount = Number($('.stats .count').first().text().replaceAll(',', ''))
  beer.image = $('.label.image-big img').attr('src')
}

console.log(`Found ${parsed.length} beers`)

fs.writeFileSync('src/data.ts', `export type BeerStyle = 'lager' | 'pale' | 'ipa' | 'dark' | 'sour' | 'wheat' | 'farmhouse' | 'cask' | 'bitter' | 'pastry' | 'belgian' | 'strong' | 'fruited' | 'barrel' | 'cider' | 'other'

export interface Beer {
  id: string,
  brewery: string,
  name: string,
  untappd?: string,
  untappdAppUrl?: string,
  untappdUrl?: string,
  rating?: number,
  ratingCount?: number,
  image?: string,
  fri_am: boolean,
  fri_pm: boolean,
  sat_am: boolean,
  sat_pm: boolean,
  abv: number,
  styles: BeerStyle[],
  gf: boolean,
  non_alc: boolean,
}

export const allBeers: Beer[] = ${JSON.stringify(parsed, null, 2)}
`)
