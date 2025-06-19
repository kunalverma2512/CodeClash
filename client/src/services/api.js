import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL;

const wakeUpBackend = async () => {
  try {
    await fetch(`${BASE_URL}`);
    return true;
  } catch {
    return false;
  }
};

// ---------------------------Navbar API calls---------------------------
// 1. Navbar Login Call via Google OAuth
export const googleLogin = async () => {
  const isAwake = await wakeUpBackend();
  setTimeout(
    () => {
      window.location.href = `${BASE_URL}/auth/google?state=participant`;
    },
    isAwake ? 1200 : 3000
  ); // buffer: 1.2s if awake, else 3s
};
// 2. Navbar Admin Login Call via Google OAuth
// Login for admin
export const googleAdminLogin = async () => {
  const isAwake = await wakeUpBackend();
  setTimeout(
    () => {
      window.location.href = `${BASE_URL}/auth/google?state=admin`;
    },
    isAwake ? 1200 : 3000
  );
};
// 3. Navbar Logout Call
export const logout = async () => {
  window.location.href = `${BASE_URL}/auth/logout`;
};

// ----------------------------Dashboard API calls---------------------------
// 1.Codeforces handle linking popup
export const linkCodeforcesHandlePopup = async (
  cfHandle,
  setVerificationCode,
  setPopupVisible,
  setCfHandle,
  setLoading,
  setStatus
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/codeforces-link/connect-cf/requestCFVerification`,
      { handle: cfHandle },
      { withCredentials: true }
    );

    if (response.data.process === "Failed") {
      toast.error(response.data.message);
    }

    setVerificationCode(response.data.verificationCode);
    setPopupVisible(true);
    setCfHandle("");
  } catch (err) {
    console.error("Linking failed:", err);
    setStatus("error");
  } finally {
    setLoading(false);
  }
};
// 2. Codeforces handle linking
export const codeforcesVerifyHandle = async (
  cfHandle,
  setCfHandle,
  setLinked,
  setPopupVisible,
  setStatus
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/codeforces-link/connect-cf/verifyCFHandle`,
      {},
      { withCredentials: true }
    );
    toast.success("We have successfully connected your Codeforces account!");
    setCfHandle(res.data.cfHandle);
    setLinked(cfHandle);
    setCfHandle("");
    setPopupVisible(false);
    setStatus("success");
    window.location.reload();
  } catch {
    toast.error("Verification failed.");
    setStatus("error");
  }
};

// ------------------------------ContestsList fetchProblems---------------------------
export const fetchContests = async (setContests, setLoading) => {
  try {
    const res = await axios.get(`${BASE_URL}/dashboard/contests`, {
      withCredentials: true,
    });
    const data = await res.data;
    setContests(data);
  } catch (error) {
    console.error("Failed to load contests:", error);
  } finally {
    setLoading(false);
  }
};

export const fetchCodeforcesProblems = async () => {
  const response = await fetch(
    `https://codeforces.com/api/problemset.problems?lang=en`
  );
  const data = await response.json();
  return data.result.problems; // return full list of problems
};

// Fetch a single contest by ID
export const fetchContestById = async (id) => {
  const response = await axios.get(`${BASE_URL}/dashboard/contests/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchProblemsByIds = async (problemIds) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/dashboard/contests/problems/batch`,
      {
        ids: problemIds,
      },
      {
        withCredentials: true,
      }
    );

    return res.data; // axios automatically parses the response
  } catch (error) {
    console.error("Error fetching problems:", error);
    throw error;
  }
};

export const fetchSingleProblemById = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/dashboard/contests/problem/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// ------------------------------Submissions API calls---------------------------
export const HandleSubmitProblem = async (
  setResult,
  setError,
  code,
  selectedLanguage,
  pid,
  setIsSubmitting
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/dashboard/contests/problem/submit`,
      { code, language: selectedLanguage, pid },
      { withCredentials: true }
    );
    const submissionId = response.data.submissionId;
    if (submissionId) {
      // navigate(`/dashboard/submissions/${submissionId}`);
      toast.success("Submitted Successfully");
    } else {
      setError("Submission succeeded, but no submission ID returned.");
    }
    setResult(response.data);
  } catch (err) {
    const message = err.response?.data?.error || "Error in submission.";
    setError(message);
    console.error("🔴 Backend Error:", err.response?.data.res || err.message);
  } finally {
    setIsSubmitting(false);
  }
};

// ------------------------------Fetch Submissions---------------------------
export const fetchCfSubmissions = async (setSubmissions, setLoading) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/dashboard/submissions/all-submissions`,
      {
        withCredentials: true,
      }
    );
    setSubmissions(res.data);
    if (res.data.status == "Accepted") {
      toast.success("Accepted Successfully");
    } else {
      toast.error(res.data.status);
    }
  } catch (err) {
    console.error("Failed to fetch submissions:", err);
  } finally {
    setLoading(false);
  }
};

// ------------------------------Fetch Submission Details---------------------------
export const fetchSubmissionDetails = async (id, setSubmission, setLoading) => {
  try {
    const res = await axios.get(`${BASE_URL}/dashboard/submissions/${id}`, {
      withCredentials: true,
    });
    setSubmission(res.data);
  } catch (err) {
    console.error("Failed to fetch submission:", err);
  } finally {
    setLoading(false);
  }
};

// ------------------------------Fetch CF Details---------------------------
export const fetchCodeforcesDetails = async (
  handle,
  setcfInfo,
  setIsLoading
) => {
  try {
    const res = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );
    setcfInfo(res.data.result[0]);
  } catch {
    toast.error("Error fetching Codeforces data");
  } finally {
    setIsLoading(false);
  }
};

export const syncCodeforces = async () => {
  try {
    const userCodeforcesInfo = await axios.post(
      `${BASE_URL}/codeforces-link/codeforces/sync/codeforces`,
      {},
      {
        withCredentials: true,
      }
    );
    return userCodeforcesInfo.data;
  } catch (error) {
    toast.error(error);
    console.log(error);
  }
};

// ------------------------------Chat Fetch Messages---------------------------
export const fetchChatMessages = async (setMessages, initialLoadDone) => {
  try {
    const res = await axios.get(`${BASE_URL}/discussion/getAllMessages`, {
      withCredentials: true,
    });
    setMessages(res.data);
    initialLoadDone.current = true; // Mark initial load done
  } catch (err) {
    console.error("Failed to fetch messages", err);
  }
};

// ------------------------------Doctor CP API calls---------------------------
export const DoctorsubmitDiagnosis = async (
  complaint,
  checkboxes,
  routine,
  goals,
  mood,
  experience,
  hoursPerDay,
  platformIssues,
  setReport
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/doctor-cp/diagnose`,
      {
        complaint,
        selected: Object.keys(checkboxes).filter((k) => checkboxes[k]),
        routine,
        goals,
        mood,
        experience,
        hoursPerDay,
        platformIssues,
      },
      { withCredentials: true }
    );
    setReport(res.data);
    if (res) {
      toast.success(
        "Diagnosis submitted successfully! please scroll down to see the report."
      );
    }
  } catch (err) {
    toast.error(err);
  }
};

// ------------------------------Admin Dashboard API calls---------------------------
export const handleCreateContest = async (contest, user, navigate) => {
  try {
    const contestData = {
      ...contest,
      tags: contest.tags.split(",").map((tag) => tag.trim()),
      createdBy: user._id,
      problems: contest.problems.map((problem) => ({
        ...problem,
        createdBy: user._id,
        tags: contest.tags.split(",").map((tag) => tag.trim()),
      })),
    };
    const response = await axios.post(
      `${BASE_URL}/admin-dashboard/contests/create-contest`,
      contestData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      toast.success("Contest created successfully!");
    }
    navigate("/admin-dashboard");
  } catch (error) {
    console.error("Error creating contest:", error.response?.data || error);
    alert("Failed to create contest.");
  }
};
