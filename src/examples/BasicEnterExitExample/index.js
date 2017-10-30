import List from './../../components/List'
import AddAnimationsHOC from './AddAnimationsHOC'
import { animateIn, animateOut } from './animations'

export default AddAnimationsHOC(
  animateIn,
  animateOut
)(List)
