export interface Task {
  id?: number;
  student: number;
  subject: number;
  name: string;
  subject_name: string;
  description: string;
  response?: string;
  delivery_date?: string;
  delivered?: number;
  qualification?: number;
  period: {
    start: string;
    end: string;
  };
}
