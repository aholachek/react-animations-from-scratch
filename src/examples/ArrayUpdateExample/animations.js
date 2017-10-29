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

export const animateItemsOut = (gridContainer, removedIds) => {
  fastForwardCurrentAnimation()
  const removedCards = [
    ...gridContainer.querySelectorAll('.card')
  ].filter(c => {
    return removedIds.includes(parseInt(c.dataset.id))
  })

  if (!removedCards || !removedCards.length) {
    return new Promise(resolve => resolve())
  }
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
  const getPersistentCards = () => {
    return [...gridContainer.querySelectorAll('.card')].filter(c => {
      return persistentIds.includes(parseInt(c.dataset.id))
    })
  }
  const persistentCards = getPersistentCards()
  const oldPositionDict = persistentCards.reduce((acc, card) => {
    acc[card.dataset.id] = card.getBoundingClientRect()
    return acc
  }, {})
  return function () {
    fastForwardCurrentAnimation()
    const persistentCards = getPersistentCards()
    if (!persistentCards || !persistentCards.length) {
      return new Promise(resolve => resolve())
    }
    const transformPositionDict = {}
    persistentCards.forEach(card => {
      const oldPosition = oldPositionDict[card.dataset.id]
      if (!oldPosition) return
      const newPosition = card.getBoundingClientRect()
      const translateX = oldPosition.left - newPosition.left
      const translateY = oldPosition.top - newPosition.top
      transformPositionDict[card.dataset.id] = {
        translateX: [translateX, 0],
        translateY: [translateY, 0]
      }
      // set persistent cards in their old positions before the next re-paint
      requestAnimationFrame(
        () =>
          (card.style.transform = `translate(${translateX}px, ${translateY}px)`)
      )
    })

    currentAnimation = anime({
      targets: persistentCards.filter(
        card => transformPositionDict[card.dataset.id]
      ),
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
  const newCards = [...gridContainer.querySelectorAll('.card')].filter(c => {
    return newIds.includes(parseInt(c.dataset.id))
  })

  currentAnimation = anime({
    targets: newCards,
    opacity: [0, 1],
    scale: [0, 1],
    duration: skipAnimation ? 0 : duration / 2,
    delay
  })
  return currentAnimation.finished
}
