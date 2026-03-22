import { NextRequest, NextResponse } from 'next/server';
import { checkWhatsAppNumber, validateWhatsAppNumber } from '@/lib/checkers/whatsapp-checker';
import { getServerSession } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    // Verify session
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { number } = body;

    if (!number) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Validate phone number format
    const validation = validateWhatsAppNumber(number);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    // Check WhatsApp number
    const result = await checkWhatsAppNumber(number);

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('WhatsApp checker error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check WhatsApp number' },
      { status: 500 }
    );
  }
}
