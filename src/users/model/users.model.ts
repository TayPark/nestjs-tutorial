import { Exclude } from 'class-transformer';

export class User {
  id: number;
  name: string;

  @Exclude()
  password: string;
  age: number;
  // exclude on DTO (control date type on server)
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
