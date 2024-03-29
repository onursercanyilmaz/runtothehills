import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Label,
  makeStyles,
} from "@fluentui/react-components";
import CButton from "./CButton";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
});

interface ModalProps {
  setIsOpen: any;
  isOpen: boolean;
  dialogTitle: string;
  button?: any;
  handleSubmit: () => void;
  dialogBody: any;

}
const Modal = (props: ModalProps) => {
  const styles = useStyles();
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    props.handleSubmit();
  };
  return (
    <Dialog modalType="modal" open={props.isOpen}>
      {props.button && <DialogTrigger disableButtonEnhancement>
        {props.button}

      </DialogTrigger>}
      <DialogSurface aria-describedby={undefined}>

        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle  >{props.dialogTitle}</DialogTitle>
            <DialogContent className={styles.content}>
              {props.dialogBody}
            </DialogContent>
            <DialogActions>

              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary" onClick={props.setIsOpen}>Close</Button>
              </DialogTrigger>
              <Button type="submit" appearance="primary">
                Submit
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default Modal;