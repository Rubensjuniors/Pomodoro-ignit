import { ACTION_TYPES } from '../context/cycleContext/types'
import { CycleState } from './types'
import { produce } from 'immer'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cyclesReducer = (state: CycleState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleID = action.payload.newCycle.id
      })
    case ACTION_TYPES.STOP_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleID
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].stopDate = new Date()
        draft.activeCycleID = null
      })
    }
    case ACTION_TYPES.FINISHED_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleID
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleID = null
      })
    }
    default:
      return state
  }
}
