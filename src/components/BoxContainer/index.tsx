import classNames from 'classnames';
import { FunctionComponent, ReactNode } from 'react';
import './index.css';

interface BoxContainerComponentProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const BoxContainerComponent: FunctionComponent<BoxContainerComponentProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <div
      className={classNames('box-container', { disabled })}
      onClick={() => {
        !disabled && onClick?.();
      }}
    >
      {children}
    </div>
  );
};

export default BoxContainerComponent;
