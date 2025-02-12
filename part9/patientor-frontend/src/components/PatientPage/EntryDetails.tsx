import { Entry } from "../../types";
import HealthCheckEntryDetails from "./EntryDetailTypes/HealthCheckDetail";
import HospitalEntryDetail from "./EntryDetailTypes/HospitalEntryDetail";
import OccupationalEntryDetails from "./EntryDetailTypes/OccupationalEntryDetails";

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetail entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetails entry={entry} />;
    default:
      return null;
  }
};

export default EntryDetails;
