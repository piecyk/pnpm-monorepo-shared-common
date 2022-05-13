import * as React from 'react'

export const Title = () => {
  React.useEffect(() => {
    console.log('mounted')
  }, [])
  
  return <div>title from commons</div>
}
