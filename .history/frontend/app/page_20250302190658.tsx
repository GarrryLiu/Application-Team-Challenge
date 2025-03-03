import ParticipantList from "./components/ParticipantList";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Box sx={{ paddingLeft: "5px", paddingTop: "20px" }}>
        {/* 添加 Participants 标题 */}
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#062DBF", paddingBottom: "10px" }}>
          Participants
        </Typography>
        <ParticipantList />
      </Box>
    </main>
  );
}
