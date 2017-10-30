import anime from 'animejs'

export const animateGroups = List => {
  const items = [...List.querySelectorAll('.item')]
  const oldPositionDict = items.reduce((acc, item) => {
    acc[item.dataset.id] = item.getBoundingClientRect()
    return acc
  }, {})
  return function initiateAnimation () {
    const transformPositionDict = {}
    // make sure to get the new array -- React might have destroyed
    // and created new DOM nodes
    const items = [...List.querySelectorAll('.item')]
    items.forEach(item => {
      const oldPosition = oldPositionDict[item.dataset.id]
      const newPosition = item.getBoundingClientRect()
      const translateX = oldPosition.left - newPosition.left
      const translateY = oldPosition.top - newPosition.top
      item.style.transform = `translate(${translateX}px, ${translateY}px)`
      transformPositionDict[item.dataset.id] = {
        translateX: [translateX, 0],
        translateY: [translateY, 0]
      }
    })
    anime({
      targets: items,
      translateX: item => transformPositionDict[item.dataset.id].translateX,
      translateY: item => transformPositionDict[item.dataset.id].translateY,
      duration: 1000,
      delay: (item, i) => i * 12,
      easing: 'easeInOutElastic',
      elasticity: 1
    })
  }
}
