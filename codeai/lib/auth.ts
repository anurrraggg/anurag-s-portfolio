import type { NextRequest } from 'next/server'

export interface AuthUser {
  id: string
  email: string
  name: string
  userType: 'learner' | 'employer' | 'institution' | 'admin'
}

export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

export function isValidToken(token: string): boolean {
  // TODO: Verify JWT token signature
  // TODO: Check token expiration
  // This is a mock implementation
  return token.startsWith('mock_jwt_token_') || token.length > 20
}

export async function getUserFromToken(token: string): Promise<AuthUser | null> {
  // TODO: Decode JWT and fetch user from database
  // This is a mock implementation
  if (isValidToken(token)) {
    return {
      id: '1',
      email: 'user@example.com',
      name: 'User Name',
      userType: 'learner',
    }
  }
  return null
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest) => {
    const token = extractTokenFromRequest(request)
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      })
    }

    const user = await getUserFromToken(token)
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
      })
    }

    // Attach user to request for use in handler
    ;(request as any).user = user
    return handler(request)
  }
}
