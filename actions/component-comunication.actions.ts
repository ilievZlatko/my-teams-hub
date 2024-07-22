import { IUser } from '@/types/user'

export enum EventType {
  UPDATE_USER = 'update_user',
}

export type MessageEvent = {
  type: EventType
  payload: { data: IUser }
}

export const listenFor = (
  type: EventType[],
  callback: (msgEvent: MessageEvent) => void,
) => {
  window.addEventListener('message', (message) => {
    try {
      if (typeof message.data === 'string') {
        const data = JSON.parse(message.data)
        if (type.includes(data.type)) {
          callback({ ...data })
        }
      }
    } catch (e) {
      console.error('Failed to parse message data:', e)
    }
  })
}

export const sendEvent = (type: EventType, payload: { data: IUser }) => {
  window.postMessage(JSON.stringify({ type, payload }), '*')
}
