export class Post {
  id: number;
  title: string;
  content: string;
  category: [string];
  published: boolean;
  // exclude on DTO (control date type on server)
  createdAt: Date;
  updatedAt: Date;
}
