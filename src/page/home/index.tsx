import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/Countdown/index'
import { useCycleContext } from '../../context/cycleContext/context'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCucleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O Ciclo precisa ser no maximo de 5 mintos')
    .max(60, 'O Intervalo precisa ser no maximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCucleFormValidationSchema>

const Home = () => {
  const { activeCycle, createNewCycle, stopCountDown } = useCycleContext()
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCucleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 25,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={stopCountDown}>
            <HandPalm size={24} />
            Parar
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}

export default Home
