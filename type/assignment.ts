interface ILO {
  [key: string]: any;
}

export interface Iassignments {
  id: string;
  title: string;
  unit_type: string;
  start_date: string;
  end_date: string;
  credit_value: string;
  image: string;
  semester_id: string;
  LO: ILO;
}

export interface Iassignment {
  id: string;
  title: string;
}
