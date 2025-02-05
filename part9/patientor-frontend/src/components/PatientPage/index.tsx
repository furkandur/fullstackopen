import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import {
  Alert,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Female, Male } from "@mui/icons-material";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [notFound, setNotFound] = useState();

  useEffect(() => {
    const patientDetail = async () => {
      if (id) {
        try {
          const patient = await patientService.getById(id);
          setPatient(patient);
        } catch (error) {
          if (error instanceof AxiosError) {
            setNotFound(error.response?.data);
          }
        }
      }
    };

    patientDetail();
  }, [id]);

  if (notFound) return <Alert severity="error">Patient Not Found</Alert>;
  if (!patient) return <Alert severity="warning">Loading</Alert>;

  const genderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <Male fontSize="large" />;
      case Gender.Female:
        return <Female fontSize="large" />;
      default:
        return;
    }
  };

  return (
    <div>
      <Stack direction={"row"} marginTop={2}>
        <Typography variant="h4">{patient.name}</Typography>
        {genderIcon()}
      </Stack>
      <Divider />
      <List>
        <Stack direction={"row"} width={"50%"}>
          <ListItem>
            <Typography>SSN: </Typography>
          </ListItem>
          <ListItem>
            <Typography>{patient.ssn}</Typography>
          </ListItem>
        </Stack>
        <Stack direction={"row"} width={"50%"}>
          <ListItem>
            <Typography>Occupation</Typography>
          </ListItem>
          <ListItem>
            <Typography>{patient.occupation}</Typography>
          </ListItem>
        </Stack>
      </List>
    </div>
  );
};

export default PatientPage;
