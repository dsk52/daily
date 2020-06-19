import * as React from 'react';

type Props = {
  children?: React.ReactNode
}

export const Container: React.FC = ({ children }: Props) => (
  <div style={{width: '90%', margin: '0 auto'}}>
    {children}
  </div>
)
