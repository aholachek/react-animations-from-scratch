import anime from 'animejs'

let currentAnimation

export const animateIn = gridContainer => {
  if (currentAnimation) currentAnimation.pause()
  const cards = [...gridContainer.querySelectorAll('.card')]
  cards.forEach(c => {
    c.style.opacity = 0
  })
  currentAnimation = anime
    .timeline()
    .add({
      targets: gridContainer,
      translateX: [-1000, 0],
      opacity: [0, 1],
      duration: 500,
      elasticity: 100
    })
    .add({
      targets: cards,
      duration: 500,
      opacity: [0, 1],
      translateY: [-30, 0],
      delay: (el, i) => i * 100
    })
}

export const animateOut = (gridContainer, callback) => {
  if (currentAnimation) currentAnimation.pause()
  const cards = gridContainer.querySelectorAll('.card')
  currentAnimation = anime
    .timeline()
    .add({
      targets: cards,
      duration: 100,
      opacity: 0,
      translateY: -30,
      delay: (el, i) => i * 50,
      easing: 'easeInOutSine'
    })
    .add({
      targets: gridContainer,
      translateX: 1000,
      opacity: [1, 0],
      duration: 1000,
      complete: callback,
      elasticity: 100
    })
}
