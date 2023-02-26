import { Comment } from '../interfaces/comment';

export class CommentData {
  constructor(
    public comments: Comment[],
    public number: number,
    public totalElements: number,
    public totalPages: number,
    public size: number
  ) {}
}
