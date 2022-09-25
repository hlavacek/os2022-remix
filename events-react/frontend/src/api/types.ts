export interface Registration {
  id: number;
  user: string;
  eventId: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  link: string;
  start: string;
  end: string;
  registrationCount: number;
}
