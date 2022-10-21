import * as express from 'express';
import { HeroService } from '../services/hero.service';

export class HeroController {
    public service: HeroService = new HeroService();

    public create = async( request: any, response: express.Response ) => {
        try {
            let result = await this.service.create( request.body, request.files );
            response.send( result );
        }
        catch ( err ){
            console.log( "hero controller, create", err );
            response.send( err );
        }
    }

    public getAll = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getAll();
            response.send( result );
        }
        catch ( err ){
            console.log( "hero controller, getAll", err );
            response.send( err );
        }
    }

    public getById = async( request: express.Request, response: express.Response ) => {
        try {
            let result = await this.service.getbyId( request.params.id );
            response.send( result );
        }
        catch ( err ){
            console.log( "hero controller, getById", err );
            response.send( err );
        }
    }

    public edit = async ( request: any, response: express.Response ) => {
        try {
            const updatedHero = await this.service.edit( request.params.id, request.body, request.files );
            response.send( updatedHero );
        }
        catch ( err ){
            console.log( "hero controller, edit", err );
            response.send( err );
        }
    }
     
    public delete = async ( request: express.Request, response: express.Response ) => {
        try {
            const deleteResponse = await this.service.delete( request.params.id );
            response.send( deleteResponse );
        }
        catch ( err ){
            console.log( "hero controller, delete", err );
            response.send( err );
        }
    }
}