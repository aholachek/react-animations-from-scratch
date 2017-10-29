import Grid from './../../components/Grid'
import AddAnimationsHOC from './AddAnimationsHOC'
import { animateIn, animateOut } from './animations'

export default AddAnimationsHOC(
  animateIn,
  animateOut
)(Grid)
