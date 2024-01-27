import { Input, Label } from '@fluentui/react-components'
import React from 'react'

interface ItemInputProps {
    item: any
    error: string
    handleItemChange: any
}
export default function ItemInput(props: ItemInputProps) {
    return (
        <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
            <Label required htmlFor={"name"}>
                item name
            </Label>
            <Input required type="text" id={"name"} placeholder='item name' value={props.item.name} onChange={(e: any) => props.handleItemChange(e)} />
            <Label required htmlFor={"description"}>
                item description
            </Label>
            <Input required type="text" id={"description"} placeholder='item description' value={props.item.description} onChange={(e: any) => props.handleItemChange(e)} />
            <Label required htmlFor={"link"}>
                item link
            </Label>
            <Input required type="text" id={"link"} placeholder='item link' value={props.item.link} onChange={(e: any) => props.handleItemChange(e)} />
            <Label required htmlFor={"image"}>
                item image
            </Label>
            <Input required type="text" id={"image"} placeholder='item image' value={props.item.image} onChange={(e: any) => props.handleItemChange(e)} />
            <Label required htmlFor={"platform"}>
                item platform
            </Label>
            <Input required type="text" id={"platform"} placeholder='item platform' value={props.item.platform} onChange={(e: any) => props.handleItemChange(e)} />
            <Label required htmlFor={"progress"}>
                item progress
            </Label>
            <Input required type="number" id={"progress"} min={0} max={100} placeholder='item progress' value={props.item.progress.toString()} onChange={(e: any) => props.handleItemChange(e)}
                onInput={(e: any) => {
                    // Max 100
                    let parsedValue = parseInt(e.target.value);

                    // Ensure the parsedValue is a valid integer
                    if (isNaN(parsedValue) || parsedValue < 0) {
                        e.target.value = 0;
                    } else if (parsedValue > 100) {
                        e.target.value = 100;
                    } else {
                        e.target.value = parsedValue;
                    }
                }
                }
            />
            <Label htmlFor={"item-name-input"} style={{ color: "#f26257" }}>
                {props.error}
            </Label>
        </div>
    )
}
