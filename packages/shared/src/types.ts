export type User = {
  id: string;
  username: string;
  displayName: string;
  bio?: string | null;
  avatarUrl: string;
  contributions: number;
  createdAt: string;
  email?: string;
  location: string;
  numConnectors: number;
  numConnections: number;
  youAreConnected: boolean;
  staff: boolean;
  updatedAt: string;
  online: boolean;
};

export type Circle = {
  id: string;
  name: string;
  description: string;
  website?: string;
  slug: string;
  coverPhoto?: string;
  membersCount: number;
  topicsCount: number;
  members: CircleMember[];
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type CircleMember = {
  id: string;
  avatarUrl: string;
  displayName: string;
  username: string;
  circleId: string;
  createdAt: string;
  bio: string;
  admin: boolean;
  moderator: boolean;
};

export interface FieldError {
  message: string;
  field: string;
}

export type CreateCircleResponse = {
  circle: Circle | null;
  errors: [FieldError] | null;
};

export interface DirectMessage {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    displayName: string;
  };
}
export interface Conversation {
  id: string;
  avatarUrl: string;
  displayName: string;
  createdAt: string;
  message: {
    text: string;
    createdAt: string;
  };
}

export interface ConnectionDB {
  id: string;
}
