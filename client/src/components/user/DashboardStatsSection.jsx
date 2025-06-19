import React, { useContext } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Box, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const DashboardStatsSection = () => {
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // <600px

  if (!user || isSmallScreen) return null; // 👉 Completely hide on mobile

  const data = user.codeforcesContests?.map((contest, index) => ({
    name: `${index + 1}`,
    rating: contest.newRating,
  })) || [];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        bgcolor: '#f0f2f5',
        px: 4,
        py: 3,
        boxSizing: 'border-box',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: '100%',
          p: 4,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          color="primary"
        >
          Codeforces Rating Graph
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#1976d2"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardStatsSection;
