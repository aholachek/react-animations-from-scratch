import React from 'react'
import { storiesOf } from '@storybook/react'

import './../index.css'

import BasicEnterExitExample from './BasicEnterExitExampleWrapper'
import ArrayUpdateExample from './ArrayUpdateExampleWrapper'
import GroupItemsExample from './GroupItemsExampleWrapper'

storiesOf('Animation Examples', module)
  .add('1. The basic technique', () => <BasicEnterExitExample />)
  .add('2. Object persistence', () => <GroupItemsExample />)
  .add('3. Enter, update and delete transitions', () => <ArrayUpdateExample />)
