const getRandomFromList = arr => arr[Math.floor(Math.random() * arr.length)]

const colors = ['red', 'blue', 'green']
const shapes = ['square', 'circle', 'rounded']

export default function generateItems (len = 50) {
  const items = [...Array(len + 1).keys()].slice(1)
  return items.map(item => ({
    id: item,
    color: getRandomFromList(colors),
    shape: getRandomFromList(shapes),
    'even/odd': item % 2 === 0
  }))
}
