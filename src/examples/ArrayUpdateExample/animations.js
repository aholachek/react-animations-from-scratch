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

const getItems = (container, ids) => {
  return [...container.querySelectorAll('.item')].filter(c => {
    return ids.includes(parseInt(c.dataset.id))
  })
}
export const animateItemsOut = (ListContainer, removedIds) => {
  fastForwardCurrentAnimation()
  const removedItems = getItems(ListContainer, removedIds)
  if (!removedItems.length) return new Promise(resolve => resolve())

  currentAnimation = anime({
    targets: removedItems,
    opacity: 0,
    scale: 0,
    duration: duration / 2,
    delay
  })
  return currentAnimation.finished
}

export const animatePersistentItems = (ListContainer, persistentIds) => {
  const persistentItems = getItems(ListContainer, persistentIds)
  const oldPositionDict = persistentItems.reduce((acc, Item) => {
    acc[Item.dataset.id] = Item.getBoundingClientRect()
    return acc
  }, {})
  return function () {
    fastForwardCurrentAnimation()
    const persistentItems = getItems(ListContainer, persistentIds)
    if (!persistentItems.length) return new Promise(resolve => resolve())

    const transformPositionDict = {}
    const targets = persistentItems.filter(Item => {
      const oldPosition = oldPositionDict[Item.dataset.id]
      // animations might be cycling through rapidly, so just ignore this node
      if (!oldPosition) return false
      const newPosition = Item.getBoundingClientRect()
      const translateX = oldPosition.left - newPosition.left
      const translateY = oldPosition.top - newPosition.top
      Item.style.transform = `translate(${translateX}px, ${translateY}px)`
      transformPositionDict[Item.dataset.id] = {
        translateX: [translateX, 0],
        translateY: [translateY, 0]
      }
      return true
    })

    currentAnimation = anime({
      // in case of rapid animation cycling
      targets,
      translateX: Item => transformPositionDict[Item.dataset.id].translateX,
      translateY: Item => transformPositionDict[Item.dataset.id].translateY,
      opacity: 1,
      duration,
      delay
    })
    return currentAnimation.finished
  }
}

export const animateItemsIn = (ListContainer, newIds, skipAnimation) => {
  fastForwardCurrentAnimation()
  const newItems = getItems(ListContainer, newIds)

  currentAnimation = anime({
    targets: newItems,
    opacity: [0, 1],
    scale: [0, 1],
    duration: skipAnimation ? 0 : duration / 2,
    delay
  })
  return currentAnimation.finished
}
