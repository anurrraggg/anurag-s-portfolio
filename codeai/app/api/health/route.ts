import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        database: 'connected', // TODO: Check actual DB connection
        blockchain: 'connected', // TODO: Check blockchain node
        proctoring: 'ready', // TODO: Check proctoring service
      },
    },
    { status: 200 }
  )
}
