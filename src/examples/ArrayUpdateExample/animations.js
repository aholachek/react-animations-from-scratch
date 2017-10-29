import anime from 'animejs'

const duration = 1000
const delay = (el, i) => i * 100

// store reference to current animation
let currentAnimation
// in case updates are coming in while another animation is still in progress,
// just fast forward the curent animation to finish it up
const fastForwardCurrentAnimation = () => {
  if (currentAnimation) currentAnimation.seek(currentAnimation.duration)
}

const getCards = (container, ids) => {
  return [...container.querySelectorAll('.card')].filter(c => {
    return ids.includes(parseInt(c.dataset.id))
  })
}
export const animateItemsOut = (gridContainer, removedIds) => {
  fastForwardCurrentAnimation()
  const removedCards = getCards(gridContainer, removedIds)
  if (!removedCards.length) return new Promise(resolve => resolve())

  currentAnimation = anime({
    targets: removedCards,
    opacity: 0,
    scale: 0,
    duration: duration / 2,
    delay
  })
  return currentAnimation.finished
}

export const animatePersistentItems = (gridContainer, persistentIds) => {
  const persistentCards = getCards(gridContainer, persistentIds)
  const oldPositionDict = persistentCards.reduce((acc, card) => {
    acc[card.dataset.id] = card.getBoundingClientRect()
    return acc
  }, {})
  return function () {
    fastForwardCurrentAnimation()
    const persistentCards = getCards(gridContainer, persistentIds)
    if (!persistentCards.length) return new Promise(resolve => resolve())

    const transformPositionDict = {}
    const targets = persistentCards.filter(card => {
      const oldPosition = oldPositionDict[card.dataset.id]
      // animations might be cycling through rapidly, so just ignore this node
      if (!oldPosition) return false
      const newPosition = card.getBoundingClientRect()
      const translateX = oldPosition.left - newPosition.left
      const translateY = oldPosition.top - newPosition.top
      card.style.transform = `translate(${translateX}px, ${translateY}px)`
      transformPositionDict[card.dataset.id] = {
        translateX: [translateX, 0],
        translateY: [translateY, 0]
      }
      return true
    })

    currentAnimation = anime({
      // in case of rapid animation cycling
      targets,
      translateX: card => transformPositionDict[card.dataset.id].translateX,
      translateY: card => transformPositionDict[card.dataset.id].translateY,
      opacity: 1,
      duration,
      delay
    })
    return currentAnimation.finished
  }
}

export const animateItemsIn = (gridContainer, newIds, skipAnimation) => {
  fastForwardCurrentAnimation()
  const newCards = getCards(gridContainer, newIds)

  currentAnimation = anime({
    targets: newCards,
    opacity: [0, 1],
    scale: [0, 1],
    duration: skipAnimation ? 0 : duration / 2,
    delay
  })
  return currentAnimation.finished
}
