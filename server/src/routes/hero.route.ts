import * as express from 'express';
import Route from '../interfaces/route.interface';
import { HeroController } from '../controllers/hero.controller';
import multer from "multer";
 

const upload = multer({dest:"uploads"});

export class HeroRoute implements Route {
  public path = '/heroes';
  public router = express.Router();
  private controller: HeroController = new HeroController();
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post( this.path, upload.array("images", 5), this.controller.create );
    this.router.get( this.path, this.controller.getAll );
    this.router.get( `${this.path}/:id`, this.controller.getById );
    this.router.patch( `${this.path}/:id`, upload.array("images", 5), this.controller.edit );
    this.router.delete( `${this.path}/:id`, this.controller.delete );
  }
}