import * as React from 'react'

console.log(React.useSyncExternalStore)

export const Title = () => {
  React.useEffect(() => {
    console.log('mounted')
  }, [])

  return <div>title from commons</div>
}
