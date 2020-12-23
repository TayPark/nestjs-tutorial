export class User {
  id: number;
  name: string;
  age: number;
  // exclude on DTO (control date type on server)
  createdAt: Date;
  updatedAt: Date;
}
