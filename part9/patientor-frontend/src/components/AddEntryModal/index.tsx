import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import AddEntryForm from "./AddEntryForm";
import { EntryFormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  onSubmit: (obj: EntryFormValues) => void;
}

const AddEntryModal = ({ modalOpen, onClose, error, onSubmit }: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={onClose}>
      <DialogTitle>Add New Entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddEntryForm onSubmit={onSubmit} />
        <Box marginTop={1}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
