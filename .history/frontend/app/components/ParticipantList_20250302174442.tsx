"use client"; // 由于要调用 API 获取数据，必须是 Client Component

import { useEffect, useState } from "react";

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  diagnoses: { icdCode: string }[];
}

export default function ParticipantList() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/participants?page=1&limit=10")
      .then((res) => res.json())
      .then((data) => setParticipants(data.data));
  }, []);

  return (
    <div>
      <h1>Participants List</h1>
      <ul>
        {participants.map((p) => (
          <li key={p.id}>
            {p.firstName} {p.lastName} - {p.diagnoses.length} Diagnoses
          </li>
        ))}
      </ul>
    </div>
  );
}
