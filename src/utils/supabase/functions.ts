import { createClient } from '@/utils/supabase/server'
import { FunctionsHttpError } from '@supabase/supabase-js'

export const invoke = async <T = any>(functionName: string, payload: any) => {
  const supabase = await createClient()

  const { data, error } = await supabase.functions.invoke<T>(functionName, {
    method: 'POST',
    body: payload
  })

  if (error instanceof FunctionsHttpError) {
    const { message } = await error.context.json()
    throw new Error(message)
  } else if (error) {
    throw new Error(error)
  } else if (!data) {
    throw new Error('Errore in risposta')
  }

  return data
}
