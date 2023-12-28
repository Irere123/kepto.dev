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
  decription: string;
  website?: string;
  slug: string;
  coverPhoto?: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
};
