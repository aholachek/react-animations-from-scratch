import anime from 'animejs'

export const animateGroups = grid => {
  const cards = [...grid.querySelectorAll('.card')]
  const oldPositionDict = cards.reduce((acc, card) => {
    acc[card.dataset.id] = card.getBoundingClientRect()
    return acc
  }, {})
  return function () {
    const transformPositionDict = {}
    // make sure to get the new array -- React might have destroyed
    // and created new DOM nodes
    const cards = [...grid.querySelectorAll('.card')]
    cards.forEach(card => {
      const oldPosition = oldPositionDict[card.dataset.id]
      const newPosition = card.getBoundingClientRect()
      const translateX = oldPosition.left - newPosition.left
      const translateY = oldPosition.top - newPosition.top
      transformPositionDict[card.dataset.id] = {
        translateX: [translateX, 0],
        translateY: [translateY, 0]
      }
      // set cards in their old positions right before the next re-paint
      requestAnimationFrame(
        () =>
          (card.style.transform = `translate(${translateX}px, ${translateY}px)`)
      )
    })
    return anime({
      targets: cards,
      translateX: card => transformPositionDict[card.dataset.id].translateX,
      translateY: card => transformPositionDict[card.dataset.id].translateY,
      duration: 1200,
      delay: (item, i) => i * 10,
      elasticity: 0
    })
  }
}
