import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse JSON data from the request
    const { formData } = await req.json();
    
    console.log('Received formData:', formData);
    
    const workizApiUrl = `https://api.workiz.com/api/v1/${process.env.WORKIZ_API_TOKEN}/lead/create/`;
    
    // Prepare the payload for Workiz API
    const payload = {
      auth_secret: process.env.AUTH_SECRET,
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Email: formData.email,
      Phone: formData.phone,
      Address: formData.serviceAddress,
      City: formData.city,
      State: formData.state,
      PostalCode: formData.postalCode,
      Country: formData.country,
      LeadNotes: `Service: ${formData.service}\nDetails: ${formData.serviceDetails}\nEstimated Cost: $${formData.estimatedCost}`
    };
    
    console.log('Payload:', payload);
    
    const workizResponse = await fetch(workizApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    const statusCode = workizResponse.status;
    const responseText = await workizResponse.text();
    
    console.log('Workiz response status:', statusCode);
    console.log('Workiz response text:', responseText);
    
    if (!workizResponse.ok) {
      console.error('Failed to create lead in Workiz', responseText);
      return NextResponse.json(
        { error: 'Failed to create lead in Workiz', details: responseText },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Lead generated in Workiz' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}