// @flow

import { List } from 'immutable'
import Task from 'Tasklee/src/records/task'

type ActionType = {
  type: string,
  index: ?string,
  task: Task,
  payload: ?{}
}

export default function (
  state: List<Task> = List(),
  action: ActionType
) {
  switch (action.type) {
    case 'ADD_TASK':
      return state.push(action.task.set('state', state.last()
        ? state.last().get('state') === 'completed' ? 'normal' : 'disabled'
        : 'normal'
      ))

    case 'EDIT_TASK':
      return state.update(action.index, task =>
        task.merge(action.payload))

    case 'COMPLETE_TASK':
      return state
        .update(action.index, task => task.set('state', 'completed'))
        .update(action.index + 1, task => task && task.set('state', 'normal'))

    case 'REMOVE_TASK':
      return state.delete(action.index)

    case 'CLEAR_TASKS':
      return List()

    default:
      return state
  }
}
