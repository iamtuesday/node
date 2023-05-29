import { Express, Request, Response } from "express";
import {
  getAllVideos,
  getVideoStream,
  uploadVideoStream,
} from "./controller/video.controller";

const routes = (app: Express) => {
  app.get("/videos", (req: Request, res: Response) => {
    return getVideoStream(req, res);
  });

  app.post("/videos", (req: Request, res: Response) => {
    return uploadVideoStream(req, res);
  });

  app.all("*", (req: Request, res: Response) => {
    const method = req.method;
    res.status(405).json({
      message: `You tried to access ${req.url} with method ${method}, but this is not allowed.`,
    });
  });
};

export default routes;
