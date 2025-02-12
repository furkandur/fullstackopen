import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BaseFormValues, Diagnosis } from "../../../types";
import { useEffect, useState } from "react";
import diagnosesService from "../../../services/diagnoses";

interface Props {
  baseFormValues: BaseFormValues;
  setBaseFormValues: React.Dispatch<React.SetStateAction<BaseFormValues>>;
}

const BaseForm = ({ baseFormValues, setBaseFormValues }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis>>([]);
  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const data = await diagnosesService.getAll();
        setDiagnoses(data);
      } catch (error) {
        throw new Error("Diagnoses can't fetched");
      }
    };

    if (diagnoses.length === 0) {
      fetchDiagnoses();
    }
  }, [diagnoses]);

  const handleCodeSelection = (
    event: SelectChangeEvent<typeof baseFormValues.diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    if (value instanceof Array) {
      setBaseFormValues({ ...baseFormValues, diagnosisCodes: value });
    }
  };

  return (
    <div>
      <Stack gap={1}>
        <TextField
          label="Description"
          fullWidth
          value={baseFormValues.description}
          onChange={({ target }) =>
            setBaseFormValues({
              ...baseFormValues,
              description: target.value,
            })
          }
        />
        <FormControl fullWidth>
          <Typography color="textSecondary">Date</Typography>
          <Input
            id="date-inp"
            type="date"
            value={baseFormValues.date}
            onChange={({ target }) =>
              setBaseFormValues({
                ...baseFormValues,
                date: target.value,
              })
            }
          />
        </FormControl>

        <TextField
          label="Specialist"
          fullWidth
          value={baseFormValues.specialist}
          onChange={({ target }) =>
            setBaseFormValues({
              ...baseFormValues,
              specialist: target.value,
            })
          }
        />
        <FormControl>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            label="Diagnosis Codes"
            value={baseFormValues.diagnosisCodes}
            multiple
            onChange={handleCodeSelection}
          >
            {diagnoses?.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
};

export default BaseForm;
