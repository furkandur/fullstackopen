import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { EntryFormValues, Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import {
  Alert,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Female, Male } from "@mui/icons-material";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [notFound, setNotFound] = useState();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

  const submitNewEntry = async (obj: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(patient.id, obj);
      setPatient({ ...patient, entries: patient.entries?.concat(entry) });
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data.error.issues[0].message) {
          const message = e.response.data.error.issues[0].message;
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
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
      <div>
        <Typography variant="h5" gutterBottom>
          Entries
        </Typography>
        <Button variant="contained" onClick={openModal}>
          Add Entry
        </Button>
        <Box marginTop={3}>
          {patient.entries && patient.entries.length > 0 ? (
            patient.entries?.map((e) => <EntryDetails key={e.id} entry={e} />)
          ) : (
            <Typography>No Entry</Typography>
          )}
        </Box>
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
    </div>
  );
};

export default PatientPage;
