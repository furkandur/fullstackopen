import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { HealthCheckEntry } from "../../../types";
import { Favorite, MonitorHeart } from "@mui/icons-material";

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheckEntryDetails = ({ entry }: Props) => {
  const healthColors = ["#00CC33", "#558822", "#AA4411", "#FF0000"];

  return (
    <Box marginBottom={2}>
      <Card>
        <CardContent>
          <Stack direction={"row"} gap={1}>
            <Typography variant="subtitle1">{entry.date}</Typography>
            <MonitorHeart />
          </Stack>
          <Divider />
          <Typography>{entry.description}</Typography>
          <Box color={healthColors[entry.healthCheckRating]}>
            <Favorite />
          </Box>
          <Typography variant="caption" color={"secondary"}>
            <i>Diagnose by {entry.specialist}</i>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HealthCheckEntryDetails;
