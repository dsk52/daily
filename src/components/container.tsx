import * as React from 'react';

type Props = {
  children?: React.ReactNode
}

export const Container: React.FC = ({ children }: Props) => (
  <div className="container">
    {children}
  </div>
)
