import { ReactNode, createContext, useContext, useState } from 'react'
import { Cycle, CycleContextInterface, createCycleData } from './types'

const CycleContext = createContext({} as CycleContextInterface)

export const useCycleContext = () => useContext(CycleContext)

export const CycleContextProvider = ({ children }: { children: ReactNode }) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleID, setActiveCycleId] = useState<string | null>(null)
  const [amountSeconds, setAmountSeconds] = useState<number>(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)

  const markCurrentCycleAsFineshed = () => {
    setCycles((state) => {
      return state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return { ...cycle, finishedDate: new Date() }
        }
        return cycle
      })
    })
    document.title = 'Pomodoro'
    setActiveCycleId(null)
  }

  const setSecondsPassed = (seconds: number) => setAmountSeconds(seconds)

  const createNewCycle = (data: createCycleData) => {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutos: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((oldValues) => [...oldValues, newCycle])
    setActiveCycleId(id)
    setAmountSeconds(0)
    console.log(data)
    // reset()
  }

  const stopCountDown = () => {
    setCycles((state) => {
      return state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return { ...cycle, stopDate: new Date() }
        }
        return cycle
      })
    })
    setActiveCycleId(null)
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleID,
        markCurrentCycleAsFineshed,
        amountSeconds,
        setSecondsPassed,
        createNewCycle,
        stopCountDown,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
