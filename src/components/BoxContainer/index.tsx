import { FunctionComponent, ReactNode } from 'react';
import './index.css';

interface BoxContainerComponentProps {
  children?: ReactNode;
  onClick?: () => void;
}

const BoxContainerComponent: FunctionComponent<BoxContainerComponentProps> = ({
  children,
  onClick,
}) => {
  return (
    <div
      className='box-container'
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </div>
  );
};

export default BoxContainerComponent;
