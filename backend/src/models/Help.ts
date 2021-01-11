import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Image from './Image'

@Entity('helps')
export default class Help {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  latitude: number

  @Column()
  longitude: number

  @Column()
  about: string

  @OneToMany(() => Image, image => image.help, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'help_id' })
  images: Image[]
}