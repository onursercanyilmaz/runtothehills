import React from 'react'
import CButton from './CButton'
import { ArrowCircleRight24Filled, ArrowRight24Filled } from "@fluentui/react-icons";
import { hover } from '@testing-library/user-event/dist/hover';
import { Button, Label } from '@fluentui/react-components';

export default function Item() {
    return (
        <div style={{ textAlign: "center" }}>
            <CButton
                buttonName={
                    <div style={{ display: "flex" }}>
                        <img
                            src="https://play-lh.googleusercontent.com/oDuTGEHru1KMr3QOfQfPKgIdNnlq3WWQxpBYND23r2a7RVnS1HW0t7dyON86Vn_QhtM=w240-h480-rw"
                            width={50}
                            height={50}
                            style={{ borderRadius: "10%" }}

                        />
                        <div style={{ flexDirection: "column", display: "flex", alignContent: "center", alignSelf: "center", marginLeft: "10px" }}>
                            <Label style={{ alignSelf: "center", color: "white", fontSize: "20px", }}>
                                C# .NET Core Clean Architecture & CQRS Proje Altyapı Kursu 4
                            </Label>
                            <Label style={{ color: "white", fontSize: "12px", }}>Item Description</Label>
                        </div>
                        <Label style={{ alignSelf: "center", color: "white", fontSize: "20px", marginLeft: "50px" }}>%23</Label>
                    </div>
                }
                after={<Button style={{ borderLeft: "none", height: "100px", marginTop: "20px", backgroundColor: "#1f1f1f", border: "var(--strokeWidthThin) solid var(--colorNeutralStroke1)" }}><ArrowRight24Filled /></Button>}
                //icon={<AddCircle32Filled />}
                onClick={() => alert("deneme")}
                style={{ marginTop: "20px", width: '75%', height: "100px", alignIsems: "left", justifyContent: "left", backgroundColor: "#1f1f1f", }}
            />

        </div>
    )
}
