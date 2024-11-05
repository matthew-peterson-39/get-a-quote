// app/api/workiz/schedule/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Fetch availability data from Workiz
    const response = await fetch(`https://api.workiz.com/api/v1/${process.env.WORKIZ_API_TOKEN}/team/all/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WORKIZ_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Workiz API error: ${response.statusText}`);
    }

    const scheduleData = await response.json();
    return NextResponse.json({ schedule: scheduleData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch schedule' }, { status: 500 });
  }
}
