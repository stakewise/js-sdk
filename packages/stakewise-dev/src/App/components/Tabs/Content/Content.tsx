import React from 'react'


export type TabsContentProps = {
  id: string
  title: string
  disabled?: boolean
}

const Content: React.FC<TabsContentProps> = (props) => {
  const { children } = props

  return children
}


export default Content
