import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Hero from './hero.entity';

@Entity()
class Image {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public path: string;

    @ManyToOne( () => Hero, (hero: Hero) => hero.images )
    public hero: Hero;
}

export default Image;