import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import Map from "./map";
import User from "./user";

@Entity()
export default class Score extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    score!: number;

    @CreateDateColumn()
    created!: Date;

    @ManyToOne(
        () => User,
        (user) => user.scores
    )
    user!: User;

    @ManyToOne(
        () => Map,
        (map) => map.scores
    )
    map!: Map;
}
