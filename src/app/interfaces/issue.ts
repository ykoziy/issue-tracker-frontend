export interface Issue {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  creatorId: number;
  creatorUsername: string;
  createdOn: string;
  closerId: number;
  updatedOn: string;
  closedOn: string;
  closerUsername: string;
  resolution: string;
}
