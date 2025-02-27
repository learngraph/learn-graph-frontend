import { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  TextField,
  Button,
} from "@mui/material";

export const UserLanding = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [educationBackground, setEducationBackground] = useState("");

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper
        elevation={3}
        style={{ padding: 20, maxWidth: 600, width: "100%" }}
      >
        <Typography variant="h5" gutterBottom>
          Help us get to know you better
        </Typography>
        <Divider style={{ marginBottom: 20 }} />

        {step === 1 && (
          <>
            <Typography variant="body1">
              Hello, so nice to meet you! How may I address you?
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={!name.trim()}
            >
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Typography variant="body1">
              Hello {name}, welcome to Learngraph! I'll help you on your
              learning journey today, but before we begin, why don't you tell me
              a little bit about yourself so I can make this experience personal
              to you? Can you tell me what you wish to learn?
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              placeholder="Enter your learning goals"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={!learningGoal.trim()}
            >
              Next
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <Typography variant="body1">
              Great! Can you please tell me a little bit about your education
              background like your degrees, courses, or training?
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              value={educationBackground}
              onChange={(e) => setEducationBackground(e.target.value)}
              placeholder="Enter your education background"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={!educationBackground.trim()}
            >
              Submit
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};
