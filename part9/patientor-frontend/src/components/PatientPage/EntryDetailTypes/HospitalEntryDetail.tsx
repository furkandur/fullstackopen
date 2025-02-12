import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { HospitalEntry } from "../../../types";
import { LocalHospital } from "@mui/icons-material";

interface Props {
  entry: HospitalEntry;
}

const HospitalEntryDetail = ({ entry }: Props) => {
  return (
    <Box marginBottom={2}>
      <Card>
        <CardContent>
          <Stack direction={"row"} gap={1}>
            <Typography variant="subtitle1">{entry.date}</Typography>
            <LocalHospital />
          </Stack>
          <Divider />
          <Typography>{entry.description}</Typography>
          <Stack direction={"row"} gap={1}>
            <Typography>
              <b>Discharge: </b>
            </Typography>
            <Typography>{entry.discharge.date}</Typography>
            <Typography>{entry.discharge.criteria}</Typography>
          </Stack>
          <Typography variant="caption" color={"secondary"}>
            <i>Diagnose by {entry.specialist}</i>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HospitalEntryDetail;
