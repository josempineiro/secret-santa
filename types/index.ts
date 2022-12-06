export interface Organizer {
  name: string;
  email: string;
}

export interface Participant {
  name: string;
  email: string;
}

export interface ApiError {
  message: string;
}

export interface Participation {
  secretSantaId: string;
  participant: Participant;
}

export interface SecretSanta {
  id?: string;
  name: string;
  drawDate: string;
  organizer: Organizer;
  password: string;
  participants: Participant[];
  completed?: boolean;
}
