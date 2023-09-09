import { ACTION_TYPES, Cycle } from '../context/cycleContext/types'

export const addNewCycle = (newCycle: Cycle) => {
  return {
    type: ACTION_TYPES.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}
export const StopCycle = () => {
  return {
    type: ACTION_TYPES.STOP_CYCLE,
  }
}
export const FinishedCycle = () => {
  return {
    type: ACTION_TYPES.FINISHED_CYCLE,
  }
}
