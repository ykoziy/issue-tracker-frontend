import { Issue } from '../interfaces/issue';

export class IssueData {
  constructor(
    public issues: Issue[],
    public number: number,
    public totalElements: number,
    public totalPages: number,
    public size: number
  ) {}
}
