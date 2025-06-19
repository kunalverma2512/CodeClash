import Contest from "../models/ContestModel.js";
import Problem from "../models/ProblemModel.js";

export const createContest = async (req,res) => {
  try {
    const {
      title,
      description,
      createdBy,
      startDate,
      endDate,
      eligibility,
      tags,
      evaluationMode,
      problems,
    } = req.body;

    const savedProblemIds = [];

    for (const problemData of problems) {
      const newProblem = new Problem({
        ...problemData,
        tags: problemData.tags || [],
      });
      const saved = await newProblem.save();
      savedProblemIds.push(saved._id);
    }

    const newContest = new Contest({
      title,
      description,
      createdBy,
      startDate,
      endDate,
      eligibility,
      tags,
      evaluationMode,

      problems: savedProblemIds,
    });
    await newContest.save();

    console.log("contest successfully saved", newContest);
    
    res
      .status(201)
      .json({
        success: true,
        message: "Contest created successfully",
        contest: newContest,
      });
  } catch (error) {
    console.error("Error creating contest:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while creating contest",
        error: error.message,
      });
  }
};
