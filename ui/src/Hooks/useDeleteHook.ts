import { Key } from 'react'

const getCSRFToken = () => {
  return document.cookie.split('=')[1]
}

export const deleteFn = async ({url, rowId}: { url: string, rowId: Key }) => {
  const response = await fetch(`${url}${rowId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken(),
    },
  })
  const data = await response.json()

  if (response.ok) {
    return data
  } else {
    throw new Error('fetch error')
  }
}
