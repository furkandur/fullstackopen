import { useState } from "react";
import BaseForm from "./EntryTypeForms.tsx/BaseForm";
import HospitalEntryForm from "./EntryTypeForms.tsx/HospitalEntryForm";
import {
  BaseFormValues,
  EntryFormValues,
  HealthCheckEntryValues,
  HospitalEntryValues,
  OccupationalHealthcareValues,
} from "../../types";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import OccupationalEntryForm from "./EntryTypeForms.tsx/OccupationalForm";
import HealthCheckEntryForm from "./EntryTypeForms.tsx/HealthCheckEntryForm";

interface Props {
  onSubmit: (obj: EntryFormValues) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [formType, setFormType] = useState("");
  const [baseFormValues, setBaseFormValues] = useState<BaseFormValues>({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  });

  const [hospitalFormValues, setHospitalFormValues] =
    useState<HospitalEntryValues>({
      type: "Hospital",
      discharge: {
        date: "",
        criteria: "",
      },
    });

  const [occupationalFormValues, setOccupationalFormValues] =
    useState<OccupationalHealthcareValues>({
      type: "OccupationalHealthcare",
      employerName: "",
    });

  const [healthCheckFormValues, setHealthCheckFormValues] =
    useState<HealthCheckEntryValues>({
      type: "HealthCheck",
      healthCheckRating: 0,
    });

  const handleChange = (event: SelectChangeEvent) => {
    setFormType(event.target.value as string);
  };

  const formTypes = () => {
    switch (formType) {
      case "Hospital":
        return (
          <HospitalEntryForm
            formValues={hospitalFormValues}
            setFormValues={setHospitalFormValues}
          />
        );
      case "OccupationalHealthcare":
        return (
          <OccupationalEntryForm
            formValues={occupationalFormValues}
            setFormValues={setOccupationalFormValues}
          />
        );
      case "HealthCheck":
        return (
          <HealthCheckEntryForm
            formValues={healthCheckFormValues}
            setFormValues={setHealthCheckFormValues}
          />
        );
      default:
        return null;
    }
  };

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    switch (formType) {
      case "Hospital":
        onSubmit({
          ...baseFormValues,
          ...hospitalFormValues,
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...baseFormValues,
          ...occupationalFormValues,
        });
        break;
      case "HealthCheck":
        onSubmit({
          ...baseFormValues,
          ...healthCheckFormValues,
        });
        break;
      default:
        break;
    }
  };

  const detailForm = formTypes();
  const forms = detailForm ? (
    <div>
      <Stack gap={2}>
        <BaseForm
          baseFormValues={baseFormValues}
          setBaseFormValues={setBaseFormValues}
        />
        <Divider />
        {detailForm}
      </Stack>
    </div>
  ) : null;

  return (
    <div>
      <Stack gap={1}>
        <FormControl fullWidth>
          <InputLabel>Entry Type</InputLabel>
          <Select
            color="secondary"
            value={formType}
            label="Entry Type"
            onChange={handleChange}
          >
            <MenuItem value="Hospital">Hospital Entry</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare Entry
            </MenuItem>
            <MenuItem value="HealthCheck">Health Check Entry</MenuItem>
          </Select>
        </FormControl>
        <form onSubmit={addEntry}>
          {forms}
          <Button type="submit" variant="contained" fullWidth>
            Add
          </Button>
        </form>
      </Stack>
    </div>
  );
};

export default AddEntryForm;
