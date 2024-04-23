import { Router } from "express";
import { validateJobInput } from "../middleware/validationMiddleware.js";
import {
  createJob,
  getJob,
  updateJob,
  deleteJob,
  getAllJobs,
  showStats,
} from "../controllers/jobController.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

//routes
const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(getJob)
  .patch(checkForTestUser, validateJobInput, updateJob)
  .delete(checkForTestUser, deleteJob);

export default router;
