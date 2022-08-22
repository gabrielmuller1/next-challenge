import { Box, Typography } from "@mui/material";

const Custom404 = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">404</Typography>
      <Typography variant="body1">Ops, não encontramos essa página</Typography>
    </Box>
  );
};

export default Custom404;
