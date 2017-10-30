import List from './../../components/List'
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
)(List)
