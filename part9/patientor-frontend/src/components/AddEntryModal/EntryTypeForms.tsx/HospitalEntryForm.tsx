import {
  FormControl,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { HospitalEntryValues } from "../../../types";

interface Props {
  formValues: HospitalEntryValues;
  setFormValues: React.Dispatch<React.SetStateAction<HospitalEntryValues>>;
}

const HospitalEntryForm = ({ formValues, setFormValues }: Props) => {
  return (
    <div>
      <Stack gap={1}>
        <Typography color="textSecondary">Discharge</Typography>
        <FormControl>
          <Typography color="textSecondary" variant="caption">
            Date
          </Typography>
          <Input
            type="date"
            fullWidth
            value={formValues.discharge.date}
            onChange={({ target }) =>
              setFormValues({
                ...formValues,
                discharge: {
                  criteria: formValues.discharge.criteria,
                  date: target.value,
                },
              })
            }
          />
        </FormControl>

        <TextField
          label="Criteria"
          fullWidth
          value={formValues.discharge.criteria}
          onChange={({ target }) =>
            setFormValues({
              ...formValues,
              discharge: {
                criteria: target.value,
                date: formValues.discharge.date,
              },
            })
          }
        />
      </Stack>
    </div>
  );
};

export default HospitalEntryForm;
