import { PlusIcon } from "@heroicons/react/solid";
import clsx from 'clsx';
import React, { HTMLProps } from 'react';

export type IconButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'type'> & { Component?: string | React.ComponentType<Omit<IconButtonProps, "Component">>; };

export function IconButton({ className, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={clsx("btn btn-xs btn-ghost min-w-0 min-h-0 w-6 h-6 p-1", className)} />
  );
}

export function AddButton(props: IconButtonProps) {
  return (
    <IconButton {...props}>
      <PlusIcon className="text-slate-100 h-4 w-4" />
    </IconButton>
  );
}

export interface IconButtonWithDropdownProps extends HTMLProps<HTMLDivElement> {
  trigger: React.ReactNode,
}

export function IconButtonWithDropdown({ children, trigger, ...props }: IconButtonWithDropdownProps) {
  return (
    <div {...props} className={clsx("dropdown", props?.className)}>
      {trigger}
      <ul tabIndex={0} className="dropdown-content menu p-2 bg-base-100 rounded-box w-52 opacity-100 hover:opacity-100 border-2 border-base-300 shadow-lg">
        {children}
      </ul>
    </div>  
  )
}