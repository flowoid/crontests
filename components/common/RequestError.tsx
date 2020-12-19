import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
  error?: Error
}

export const RequestError = (props: Props) => {
  const router = useRouter()

  useEffect(() => {
    if (props.error?.message === 'Unauthorized') {
      void router.push('/login')
    }
  }, [props.error])

  return <>{ props.error?.message ?? 'Unexpected error, please try again.' }</>
}
