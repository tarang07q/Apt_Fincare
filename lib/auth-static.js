// This file provides mock implementations for NextAuth in static export mode

// Mock session data for static export
export const mockSession = {
  user: {
    id: 'static-user-id',
    name: 'Demo User',
    email: 'demo@example.com',
  },
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
};

// Mock implementation for useSession in static export
export function useStaticSession() {
  return {
    data: mockSession,
    status: 'authenticated',
    update: () => Promise.resolve(mockSession),
  };
}

// Mock implementation for getServerSession in static export
export function getStaticServerSession() {
  return Promise.resolve(mockSession);
}
