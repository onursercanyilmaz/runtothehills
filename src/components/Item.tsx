import React from 'react'
import CButton from './CButton'
import { ArrowRight24Filled } from "@fluentui/react-icons";
import { Button, Field, Label, ProgressBar } from '@fluentui/react-components';
import './components.css'
import urlChecker from '../constants/urlChecker';

interface ItemProps {
    itemDescription: string
    itemName: string
    progress: string | number
    navigateToItemLink: any
    openEditItemModal: any
    itemImage: string
    platform: string
    id: string
}

export default function Item(props: ItemProps) {
    return (
        <div style={{ textAlign: "center" }}>
            <CButton
                id={props.id}
                className="itemButton"
                buttonName={
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <div style={{ display: "flex" }}>
                                {urlChecker(props.itemImage) ? <img
                                    src={props.itemImage}
                                    width={50}
                                    height={50}
                                    style={{ borderRadius: "10%" }}

                                /> : ""}
                                <div style={{ flexDirection: "column", display: "flex", alignContent: "center", alignSelf: "center", marginLeft: "10px" }}>
                                    <Label style={{ alignSelf: "center", color: "white", fontSize: "20px", }}>
                                        {props.itemName}
                                    </Label>
                                    <Label style={{ color: "white", fontSize: "12px", }}>{props.itemDescription}</Label>
                                </div>
                            </div>
                            <Label style={{ alignSelf: "center", color: "white", fontSize: "20px", marginRight: "10px" }}>{props.platform}</Label>
                            <Label style={{ alignSelf: "center", color: "white", fontSize: "20px", marginRight: "10px" }}>%{props.progress}</Label>

                        </div>

                        <Field validationState="success" style={{ paddingTop: "20px" }}>
                            <ProgressBar value={Number(props.progress) / 100} color="success" />
                        </Field>
                    </>
                }
                after={<Button onClick={props.navigateToItemLink} style={{ borderLeft: "none", height: "100px", marginTop: "20px", backgroundColor: "#1f1f1f", border: "var(--strokeWidthThin) solid var(--colorNeutralStroke1)" }}><ArrowRight24Filled /></Button>}
                onClick={props.openEditItemModal}
                style={{ marginTop: "20px", paddingBottom: "0px", width: '75%', height: "100px", alignIsems: "left", justifyContent: "left", backgroundColor: "#1f1f1f", }}
            />

        </div>
    )
}
