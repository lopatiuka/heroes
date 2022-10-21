import axios from 'axios';

export class HeroService {

    private path = "http://localhost:5000/heroes";

    public getHeroes = async () => {
        try {
            let result = await axios.get(this.path);
            return result.data;
        } catch (error: any) {
            console.error(error);
            throw new Error("Fetch failed, try again later");
        }
    }

    public getHeroById = async (id: number) => {
        try {
            
            let result = await axios.get(`${this.path}/${id}`);
            if(result.data.toString().includes("Error")) {
                throw new Error(result.data);
            }

            return result.data;
        } catch (error: any) {
            console.error(error);
            throw new Error("Fetch failed, try again later");
        }
    }

    public createHero = async (body: Object) => {
        try {
            let result = await axios.post(this.path, body);
            
            if(result.data.toString().includes("Error")) {
                throw new Error(result.data);
            }

            return result.data;
        } catch (error) {
            console.error(error);
            throw new Error("Something wrong, try again later");
        }
    }

    public editHero = async (id: number, body: Object) => {
        try {
            let result = await axios.patch(`${this.path}/${id}`, body);
            
            if(result.data.toString().includes("Error")) {
                throw new Error(result.data);
            }

            return result.data;
        } catch (error) {
            console.error(error);
            throw new Error("Something wrong, try again later");
        }
    }

    public deleteHero = async (id: number) => {
        try {
            let result = await axios.delete(`${this.path}/${id}`);
            
            if(result.data.toString().includes("Error")) {
                throw new Error(result.data);
            }
            
            return result.data;
        } catch (error) {
            console.error(error);
            throw new Error("Something wrong, try again later");
        }
    }
}


