import Grid from './../../components/Grid'
import GroupItemsHOC from './GroupItemsHOC'
import { animateGroups } from './animations'

export default GroupItemsHOC(
  animateGroups
)(Grid)
