import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { OccupationalHealthcare } from "../../../types";
import { Healing } from "@mui/icons-material";

interface Props {
  entry: OccupationalHealthcare;
}

const OccupationalEntryDetails = ({ entry }: Props) => {
  return (
    <Box marginBottom={2}>
      <Card>
        <CardContent>
          <Stack direction={"row"} gap={1}>
            <Typography variant="subtitle1">{entry.date}</Typography>
            <Healing />
            <Typography variant="subtitle1">
              <b>{entry.employerName}</b>
            </Typography>
          </Stack>
          <Divider />
          <Typography>{entry.description}</Typography>
          <Typography variant="caption" color={"secondary"}>
            <i>Diagnose by {entry.specialist}</i>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OccupationalEntryDetails;
