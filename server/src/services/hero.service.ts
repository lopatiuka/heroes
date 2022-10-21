import { config } from '../ormconfig';
import Hero from '../models/hero.entity';
import Image from '../models/image.entity';

export class HeroService {
    private heroRepository;
    private imageRepository;
    
    constructor(){
        this.heroRepository = config.getRepository(Hero);
        this.imageRepository = config.getRepository(Image);
    }

    public create = async ( body: Object, files: any ) => {
        try {
            let images = [];
            files.forEach(async item => {
                images.push(item.path);
            })

            const data = {
                images: images,
                ...body
            }
            let result = await this.heroRepository.save(data);
            return( result );
        }
        catch ( err ) {
            return( "Create Hero error" + err );
        }
    } 

    public getAll = async () => {
        try {
            const hero = await this.heroRepository.find();
            return ( hero );
        }
        catch( err ){
            return ( "Get all heroes error" + err);
        }
    }

    public getbyId = async ( id: string ) => {
        try {
            let images = this.imageRepository.findBy({hero: id});
            let hero = await this.heroRepository.findOneBy({id});

            hero.images = images;
            return hero;
        }
        catch( err ) {
            return ( "get Hero by Id" + err);
        }
    }

    public edit = async ( id: string, body: any, files: any ) => {
        try{ 
            if( !await this.heroRepository.findOneBy( {id} ) ){
                return `Id ${ id } Not Found`;
            }

            if(files.length > 0) {
                let images = [];
                files.forEach(async item => {
                    body.images = body.images === "" ? item.path : body.images + "," + item.path;
                })
            }

            if( body.images !== "") {
                body.images = body.images.split(",");
            }

            let updatedHero = await this.heroRepository.update( id, body );
            return updatedHero.affected ? { id, ...body } : "Not updated, smth wrong";
        }
        catch ( err ) {
            return ( "Edit hero error" + err);
        }
    }
    
    public delete = async ( id: string ) => {
        try {
            const deleteResponse = await this.heroRepository.delete( id );
            if (deleteResponse.affected !== 0) {
            return (id);
            } else {
             throw new Error("Id not found");
            }
        }
        catch ( err ) {
            return ( "delete hero error" + err);
        }
    }
}