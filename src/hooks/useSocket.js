import { useState, useEffect, useMemo } from 'react'
import io from 'socket.io-client'

import { API_URL } from '../api/config'

export const useSocket = () => {
  const socket = useMemo(
    () =>
      io(API_URL, {
        transports: ['websocket']
      }),
    [API_URL]
  )

  const [online, setOnline] = useState(false)

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })
    socket.on('disconnect', () => {
      setOnline(false)
    })
  }, [socket])

  return { socket, online }
}
