import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Help from './Help'

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    path: string

    @ManyToOne(() => Help, help => help.images)
    @JoinColumn({ name: 'help_id' })
    help: Help
}