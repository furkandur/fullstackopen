import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { OccupationalHealthcareValues } from "../../../types";
import { useEffect, useState } from "react";

interface Props {
  formValues: OccupationalHealthcareValues;
  setFormValues: React.Dispatch<
    React.SetStateAction<OccupationalHealthcareValues>
  >;
}

const OccupationalEntryForm = ({ formValues, setFormValues }: Props) => {
  const [checked, setChecked] = useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      sickLeave: checked
        ? prev.sickLeave ?? { startDate: "", endDate: "" }
        : undefined,
    }));
  }, [checked, setFormValues]);

  return (
    <div>
      <Stack gap={1}>
        <TextField
          label="Employer Name"
          fullWidth
          value={formValues.employerName}
          onChange={({ target }) =>
            setFormValues({ ...formValues, employerName: target.value })
          }
        />
        <FormControlLabel
          label="Sick Leave"
          control={<Checkbox checked={checked} onChange={handleChange} />}
        />
        {checked && (
          <>
            <FormControl>
              <Typography>Start Date</Typography>
              <Input
                type="date"
                fullWidth
                value={formValues.sickLeave?.startDate || ""}
                onChange={({ target }) =>
                  setFormValues((prev) => ({
                    ...prev,
                    sickLeave: prev.sickLeave
                      ? { ...prev.sickLeave, startDate: target.value }
                      : { startDate: target.value, endDate: "" }, // Eğer yoksa oluştur
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <Typography>End Date</Typography>
              <Input
                type="date"
                fullWidth
                value={formValues.sickLeave?.endDate || ""}
                onChange={({ target }) =>
                  setFormValues((prev) => ({
                    ...prev,
                    sickLeave: prev.sickLeave
                      ? { ...prev.sickLeave, endDate: target.value }
                      : { startDate: "", endDate: target.value }, // Eğer yoksa oluştur
                  }))
                }
              />
            </FormControl>
          </>
        )}
      </Stack>
    </div>
  );
};

export default OccupationalEntryForm;
