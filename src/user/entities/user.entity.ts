import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm'
// import { CommentEntity } from '../../comment/entities/comment.entity'
// import { PostEntity } from '../../post/entities/post.entity'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({
    unique: true,
  })
  email: string;

  // @OneToMany(() => CommentEntity, (comment) => comment.user, {
  //   eager: false,
  //   nullable: true,
  // })
  // comments: CommentEntity[];
  //
  // @OneToMany(() => PostEntity, (post) => post.user, {
  //   eager: false,
  //   nullable: true,
  // })
  // posts: PostEntity[];

  @Column({ nullable: true })
  password?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
