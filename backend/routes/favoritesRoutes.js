import express from "express";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  checkIsFavorite,
} from "../controllers/favoriteController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", getFavorites);
router.post("/:propertyId", addToFavorites);
router.get("/check/:propertyId", checkIsFavorite);
router.delete("/:propertyId", removeFromFavorites);

export default router;
