import React from 'react'

import { Parallax } from 'react-parallax'

export default ({ src, children }) => {
  return (
    <Parallax
      bgImage={src}
      strength={500}
      bgImageStyle={{ opacity: 0.5 }}
      style={{ backgroundColor: '#000' }}
    >
      {children}
    </Parallax>
  )
}