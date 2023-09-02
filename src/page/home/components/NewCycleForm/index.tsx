import { FormContainer, TaskInpit, MinutesInpit } from './styled'
import { useCycleContext } from '../../../../context/cycleContext/context'
import { useFormContext } from 'react-hook-form'

export const NewCycleForm = () => {
  const { activeCycle } = useCycleContext()
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou Trabalhar em</label>
      <TaskInpit
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        autoComplete="off"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1"></option>
      </datalist>

      <label htmlFor="minutesAmount">Durante</label>
      <MinutesInpit
        type="Number"
        id="minutesAmount"
        placeholder="00"
        step={1}
        min={1}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>Minutos</span>
    </FormContainer>
  )
}
