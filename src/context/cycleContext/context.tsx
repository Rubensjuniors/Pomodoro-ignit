import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, CycleContextInterface, createCycleData } from './types'
import { cyclesReducer } from '../../reducers/reducer'
import { FinishedCycle, StopCycle, addNewCycle } from '../../reducers/actions'
import { differenceInSeconds } from 'date-fns'

const CycleContext = createContext({} as CycleContextInterface)

export const useCycleContext = () => useContext(CycleContext)

export const CycleContextProvider = ({ children }: { children: ReactNode }) => {
  const [cycleState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleID: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@pomodoro:cycleState-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )
  const { cycles, activeCycleID } = cycleState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)

  const [amountSeconds, setAmountSeconds] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cycleState)
    localStorage.setItem('@pomodoro:cycleState-1.0.0', stateJSON)
  }, [cycleState])

  const markCurrentCycleAsFineshed = () => {
    dispatch(FinishedCycle())
    document.title = 'Pomodoro'
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

    dispatch(addNewCycle(newCycle))
    setAmountSeconds(0)
  }

  const stopCountDown = () => {
    dispatch(StopCycle())
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
