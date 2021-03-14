import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
  error?: Error | string
}

export const RequestError = (props: Props) => {
  const router = useRouter()
  const error = typeof props.error === 'string' ? props.error : props.error?.message

  useEffect(() => {
    if (error === 'Unauthorized') {
      void router.push('/login')
    }
  }, [props.error])

  return <>{ error ?? 'Unexpected error, please try again.' }</>
}
