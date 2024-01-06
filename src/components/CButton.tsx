import React from 'react'
import { CompoundButton } from '@fluentui/react-components';
import type { CompoundButtonProps } from "@fluentui/react-components";
interface CButtonProps {
  CompoundButtonProps?: CompoundButtonProps
    style: any
    secondaryContent?:any
    onClick:any
    buttonName:any
    icon?:any

}

export default function CButton(props: CButtonProps) {
  return (
    <CompoundButton
    icon={props.icon!==null && props.icon}
    secondaryContent={props.secondaryContent}
    {...props.CompoundButtonProps}
    style={props.style}
    onClick={props.onClick}
  >
    {props.buttonName}
  </CompoundButton>
  )
}
