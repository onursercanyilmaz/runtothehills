import React from 'react'
import { CompoundButton } from '@fluentui/react-components';
import type { CompoundButtonProps } from "@fluentui/react-components";
interface CButtonProps {
  after?: any
  before?: any
  CompoundButtonProps?: CompoundButtonProps
  style?: any
  secondaryContent?: any
  onClick?: any
  buttonName: any
  icon?: any
  className?: any
  id?: any
}

export default function CButton(props: CButtonProps) {
  return (
    <>
      {props.before}
      <CompoundButton
        id={props.id}
        className={props.className}
        icon={props.icon !== null && props.icon}
        secondaryContent={props.secondaryContent}
        {...props.CompoundButtonProps}
        style={props.style}
        onClick={props.onClick}
      >
        {props.buttonName}
      </CompoundButton>
      {props.after}

    </>

  )
}
