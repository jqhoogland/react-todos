import React, { HTMLProps } from 'react';

export type IconButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'type'> & { Component?: string | React.ComponentType<Omit<IconButtonProps, "Component">>; };

export function IconButton({ className, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={"min-w-0 min-h-0 w-6 h-6 p-1 " + (className ?? "")} />
  );
}

export function AddButton(props: IconButtonProps) {
  return (
    <IconButton {...props}>
      +
    </IconButton>
  );
}

export interface IconButtonWithDropdownProps extends HTMLProps<HTMLDivElement> {
  trigger: React.ReactNode,
}
