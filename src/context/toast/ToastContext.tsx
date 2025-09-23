import { createContext, useCallback, useMemo, useState, type PropsWithChildren } from 'react'

export type ToastVariant = 'success' | 'error'

export type ToastPayload = {
  id: string
  message: string
  variant: ToastVariant
}

export type ToastContextValue = {
  toasts: ToastPayload[]
  pushToast: (toast: Omit<ToastPayload, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

let idCounter = 0
const createId = () => `toast-${Date.now()}-${++idCounter}`

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastPayload[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback(
    (toast: Omit<ToastPayload, 'id'>) => {
      const id = createId()
      setToasts((prev) => [...prev, { ...toast, id }])
      setTimeout(() => removeToast(id), 5500)
    },
    [removeToast],
  )

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, pushToast, removeToast }),
    [toasts, pushToast, removeToast],
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export default ToastContext
