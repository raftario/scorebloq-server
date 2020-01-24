import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import Score from "./score";

export enum Difficulty {
    Easy = "Easy",
    Normal = "Normal",
    Hard = "Hard",
    Expert = "Expert",
    ExpertPlus = "ExperPlus",
}

@Entity()
export default class Map extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "bytea",
        unique: true,
    })
    hash!: Buffer;

    @Column("text")
    songName!: string;

    @Column("text")
    songSubName!: string;

    @Column("text")
    songAuthorName!: string;

    @Column("text")
    levelAuthorName!: string;

    @Column({
        type: "enum",
        enum: Difficulty,
    })
    difficulty!: Difficulty;

    @Column("text")
    beatmapCharacteristicName!: string;

    @CreateDateColumn({
        type: "timestamp with time zone",
    })
    created!: Date;

    @OneToMany(
        () => Score,
        (score) => score.user
    )
    scores!: Score[];
}
