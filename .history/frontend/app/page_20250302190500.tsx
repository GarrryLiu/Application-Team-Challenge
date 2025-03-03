import ParticipantList from "./components/ParticipantList";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Box sx={{ display: "flex", justifyContent: "flex-start", paddingLeft: "px" }}>
        <ParticipantList />
      </Box>
    </main>
  );
}
