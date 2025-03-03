"use client";

const ParticipantList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const router = useRouter();

  // ⬇️ Fetch API 数据，每次排序状态改变时重新请求
  useEffect(() => {
    fetch(`http://localhost:5000/participants?page=1&limit=10&sort=${sortOrder}`)
      .then((res) => res.json())
      .then((data) => setParticipants(data.data))
      .catch((error) => console.error("Error fetching participants:", error));
  }, [sortOrder]);  // 🔥 依赖项：当 sortOrder 变化时触发请求

  // ⬇️ 切换排序顺序
  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <Box sx={{ maxWidth: 1500, margin: "auto", mt: 4 }}>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Participant Name</strong></TableCell>
              <TableCell align="right">
                <Box display="flex" alignItems="center" justifyContent="flex-end">
                  <strong>ICD Codes</strong>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleSort();  // 直接更新 state，触发 useEffect
                      console.log("Sort button clicked, new order:", sortOrder === "asc" ? "desc" : "asc");
                    }}
                    style={{ 
                      border: "1px solid #e0e0e0", 
                      background: "white", 
                      cursor: "pointer", 
                      marginLeft: "8px", 
                      padding: "6px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "36px",
                      minHeight: "36px",
                      zIndex: 10,
                      position: "relative"
                    }}
                  >
                    <Image 
                      src={sortOrder === "asc" ? "/orderFilter_Up.svg" : "/orderFilter_Down.svg"}
                      alt={sortOrder === "asc" ? "Sort Ascending" : "Sort Descending"}
                      width={24}
                      height={24}
                      style={{ pointerEvents: "none" }}
                    />
                  </button>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant) => (
              <TableRow 
                key={participant.id} 
                sx={{ "&:hover": { border: "2px solid #4D7EF8", cursor: "pointer", transition: "0.2s" } }}
                onClick={() => router.push(`/participant/${participant.id}`)}
              >
                <TableCell sx={{ cursor: "pointer" }}>{participant.firstName} {participant.lastName}</TableCell>
                <TableCell 
                  align="right" 
                  onClick={(e) => e.stopPropagation()}
                  sx={{ cursor: "default" }}
                >
                  {participant.diagnoses.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ParticipantList;
