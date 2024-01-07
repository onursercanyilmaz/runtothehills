import * as React from "react";
import { makeStyles, Persona } from "@fluentui/react-components";

interface PersonCardProps {
  username?: string;
}
export const PersonaCard = (props:PersonCardProps) => {

  return (
    <div style={{cursor:"pointer"}}>
      <Persona
        style={{textAlign:"center"}}
        textPosition="after"
        name={props.username}
      />
    </div>
  );
};