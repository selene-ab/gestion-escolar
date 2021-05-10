export interface NewTask {
  student: number;
  subject?: number;
  name: string;
  description: string;
  period: {
    start: string;
    end: string;
  };
}
