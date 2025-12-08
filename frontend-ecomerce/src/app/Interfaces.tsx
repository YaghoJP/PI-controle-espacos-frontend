
export interface Reservation {
    id: number;
    user_id: number;
    space_id: number;
    start_time: string;
    end_time: string;
    reservation_date: string;
  }


export interface User {
  id: number;
  name: string;
  email: string;
  role?: string | null;
};