import anime from 'animejs'

export const animateGroups = grid => {
  const cards = [...grid.querySelectorAll('.card')]
  const oldPositionDict = cards.reduce((acc, card) => {
    acc[card.dataset.id] = card.getBoundingClientRect()
    return acc
  }, {})
  return function initiateAnimation () {
    const transformPositionDict = {}
    // make sure to get the new array -- React might have destroyed
    // and created new DOM nodes
    const cards = [...grid.querySelectorAll('.card')]
    cards.forEach(card => {
      const oldPosition = oldPositionDict[card.dataset.id]
      const newPosition = card.getBoundingClientRect()
      const translateX = oldPosition.left - newPosition.left
      const translateY = oldPosition.top - newPosition.top
      card.style.transform = `translate(${translateX}px, ${translateY}px)`
      transformPositionDict[card.dataset.id] = {
        translateX: [translateX, 0],
        translateY: [translateY, 0]
      }
    })
    anime({
      targets: cards,
      translateX: card => transformPositionDict[card.dataset.id].translateX,
      translateY: card => transformPositionDict[card.dataset.id].translateY,
      duration: 1000,
      delay: (item, i) => i * 12,
      easing: 'easeInOutElastic',
      elasticity: 1
    })
  }
}
