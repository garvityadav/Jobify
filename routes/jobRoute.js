import { Router } from "express";
import { validateJobInput } from "../middleware/validationMiddleware.js";
import {
  createJob,
  getJob,
  updateJob,
  deleteJob,
  getAllJobs,
} from "../controllers/jobController.js";

const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(getJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

export default router;
