import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Image from "./image.entity";

@Entity()
class Hero {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public nickname: string;

    @Column()
    public realName: string;

    @Column()
    public originDescription: string;

    @Column()
    public superpowers: string;

    @Column()
    public catchPhrase: string;

    @Column("simple-array", {
        nullable: true
    })
    public images: string[];

//     @OneToMany(() => Image, (image: Image) => image.hero)
//     public images: Image[];
}

export default Hero;