import { useEffect } from 'react'
import { CountDownContainer, Separator } from './styled'
import { useCycleContext } from '../../../../context/cycleContext/context'
import { differenceInSeconds } from 'date-fns'

export const CountDown = () => {
  const {
    activeCycle,
    activeCycleID,
    markCurrentCycleAsFineshed,
    amountSeconds,
    setSecondsPassed,
  } = useCycleContext()
  const totalSeconds = activeCycle ? activeCycle.minutos * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSeconds : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsamount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsamount).padStart(2, '0')

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondesDefferenc = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondesDefferenc >= totalSeconds) {
          markCurrentCycleAsFineshed()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondesDefferenc)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleID,
    markCurrentCycleAsFineshed,
    setSecondsPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
