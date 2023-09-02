export interface createCycleData {
  task: string
  minutesAmount: number
}

export interface Cycle {
  id: string
  task: string
  minutos: number
  startDate: Date
  stopDate?: Date
  finishedDate?: Date
}

export interface CycleContextInterface {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleID: string | null
  markCurrentCycleAsFineshed: () => void
  amountSeconds: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: createCycleData) => void
  stopCountDown: () => void
}
