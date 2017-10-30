import List from './../../components/List'
import GroupItemsHOC from './GroupItemsHOC'
import { animateGroups } from './animations'

export default GroupItemsHOC(
  animateGroups
)(List)
