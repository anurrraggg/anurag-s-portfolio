import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId

    // TODO: Fetch user credentials from database
    // Mock data
    const credentials = [
      {
        id: '1',
        title: 'Advanced React Development',
        issuer: 'Tech Academy',
        date: '2024-10-15',
        score: 95,
        blockchainHash: '0x7f4c9d2e1a6b3f8c',
        status: 'verified',
      },
      {
        id: '2',
        title: 'Python for AI & ML',
        issuer: 'Learning Lab',
        date: '2024-09-20',
        score: 88,
        blockchainHash: '0x2a1b8c9d7e3f4g5h',
        status: 'verified',
      },
      {
        id: '3',
        title: 'Cloud Architecture Mastery',
        issuer: 'Cloud Institute',
        date: '2024-08-10',
        score: 92,
        blockchainHash: '0x5g4h3i2j1k0l9m8n',
        status: 'verified',
      },
    ]

    return NextResponse.json({ credentials }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch credentials' },
      { status: 500 }
    )
  }
}
