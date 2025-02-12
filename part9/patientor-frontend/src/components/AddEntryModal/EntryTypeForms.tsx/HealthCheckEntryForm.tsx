import { Rating, Typography } from "@mui/material";
import { HealthCheckEntryValues } from "../../../types";
import { useEffect, useState } from "react";

interface Props {
  formValues: HealthCheckEntryValues;
  setFormValues: React.Dispatch<React.SetStateAction<HealthCheckEntryValues>>;
}

const HealthCheckEntryForm = ({ formValues, setFormValues }: Props) => {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    if (rating !== null && formValues.healthCheckRating !== 4 - rating) {
      setFormValues({ ...formValues, healthCheckRating: 4 - rating });
    }
  }, [formValues, rating, setFormValues]);

  return (
    <div>
      <Typography>Health Rating</Typography>
      <Rating
        value={rating}
        onChange={(_event, newValue) => {
          setRating(newValue);
        }}
        max={4}
      />
    </div>
  );
};

export default HealthCheckEntryForm;
