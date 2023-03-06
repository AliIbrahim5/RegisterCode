import express from "express";
import {
  deleteMovie,
  getmmovieGenre,
  getmmovieName,
  getmmovieRating,
  getMovie,
  postMovie,
  updateMovie,
} from "../controler/movieControler";
import validate from "../middleware/validate";
import { movieSchema } from "../schemas/movieSchema";

const movieRouter = express.Router();

// get all movies
movieRouter.get(`/`, getMovie);

// post new movie
movieRouter.post(`/`, validate(movieSchema), postMovie);

// update movie
movieRouter.put(`/:id`, validate(movieSchema), updateMovie);

// delete movie
movieRouter.delete(`/:id`, deleteMovie);

// get movie by name
movieRouter.get(`/name/:name`, getmmovieName);

// get movie by genre
movieRouter.get(`/genre/:genre`, getmmovieGenre);

// get movie by rating 
movieRouter.get(`/rating/:rate`,getmmovieRating)

export default movieRouter;
