export class User {
  id: number;
  name: string;
  password: string;
  age: number;
  // exclude on DTO (control date type on server)
  createdAt: Date;
  updatedAt: Date;
}
