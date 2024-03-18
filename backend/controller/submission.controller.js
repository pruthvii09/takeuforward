import { prisma } from "../prisma/prisma.js";
export const addSumbission = async (req, res) => {
  try {
    const { username, language_id, stdin, source_code } = req.body;
    console.log(req.body);
    if (!username || !source_code) {
      return res
        .status(400)
        .json({ status: "error", error: "All Fields Required" });
    }
    const submission = await prisma.submission.create({
      data: {
        username,
        language_id,
        stdin,
        source_code,
      },
    });
    if (!submission) {
      res
        .status(400)
        .json({ status: "error", error: "Something went wrong!!" });
    }
    res.status(201).json({
      status: "success",
      message: "Submitted Successfully!!",
      data: submission,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

//Get all submission
export const getAllSubmission = async (req, res) => {
  const { page = 1 } = req.query;
  const perPage = 10;
  const skip = (page - 1) * perPage;

  try {
    const submissions = await prisma.submission.findMany({
      take: perPage,
      skip: skip,
      orderBy: { timestamp: "desc" }, // Optionally order by timestamp
    });
    const totalSubmissions = await prisma.submission.count();
    res
      .status(200)
      .json({ status: "success", count: totalSubmissions, data: submissions });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// // Delete a lecture
// export const deleteLecture = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await prisma.lecture.delete({
//       where: {
//         id: id,
//       },
//     });
//     res.status(200).json({ status: "success", message: "Lecture deleted" });
//   } catch (error) {
//     res.status(500).json({ status: "error", error: error.message });
//   }
// };
