import { Cycle } from '../context/cycleContext/types'

export interface CycleState {
  cycles: Cycle[]
  activeCycleID: string | null
}
