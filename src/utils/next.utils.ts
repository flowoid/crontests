import { NextApiRequest, NextPageContext } from 'next'

export const getQueryParam = (ctx: NextPageContext | NextApiRequest, key: string): string => {
  const value = ctx.query[key]
  if (Array.isArray(value)) {
    return value[0]
  }
  return value ?? ''
}

export const isBrowser = typeof window !== 'undefined' && window.document && window.document.createElement

export const isServer = !isBrowser
