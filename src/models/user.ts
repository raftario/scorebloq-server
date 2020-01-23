import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import Score from "./score";

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "text",
        unique: true,
    })
    username!: string;

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    @OneToMany(
        () => Score,
        (score) => score.user
    )
    scores!: Score[];
}
