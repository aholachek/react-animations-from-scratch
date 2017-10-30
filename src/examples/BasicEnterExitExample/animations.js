import anime from 'animejs'

let currentAnimation

export const animateIn = ListContainer => {
  if (currentAnimation) currentAnimation.pause()
  const items = [...ListContainer.querySelectorAll('.item')]
  items.forEach(c => {
    c.style.opacity = 0
  })
  currentAnimation = anime
    .timeline()
    .add({
      targets: ListContainer,
      translateX: [-1000, 0],
      opacity: [0, 1],
      duration: 500,
      elasticity: 100
    })
    .add({
      targets: items,
      duration: 500,
      opacity: [0, 1],
      translateY: [-30, 0],
      delay: (el, i) => i * 100
    })
}

export const animateOut = (ListContainer, callback) => {
  if (currentAnimation) currentAnimation.pause()
  const items = ListContainer.querySelectorAll('.item')
  currentAnimation = anime
    .timeline()
    .add({
      targets: items,
      duration: 100,
      opacity: 0,
      translateY: -30,
      delay: (el, i) => i * 50,
      easing: 'easeInOutSine'
    })
    .add({
      targets: ListContainer,
      translateX: 1000,
      opacity: [1, 0],
      duration: 1000,
      complete: callback,
      elasticity: 100
    })
}
