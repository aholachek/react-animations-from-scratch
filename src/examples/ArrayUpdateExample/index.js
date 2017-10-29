import Grid from './../../components/Grid'
import AddArrayAnimationsHOC from './AddArrayAnimationsHOC'
import {
  animateItemsIn,
  animateItemsOut,
  animatePersistentItems
} from './animations'

export default AddArrayAnimationsHOC(
  animateItemsIn,
  animateItemsOut,
  animatePersistentItems
)(Grid)
