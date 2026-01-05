import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { broadcastId } = await request.json();

    if (!broadcastId) {
      return NextResponse.json({ error: 'Broadcast ID is required' }, { status: 400 });
    }

    // Delete recipients first
    await supabaseAdmin
      .from('broadcast_recipients')
      .delete()
      .eq('broadcast_id', broadcastId);

    // Delete broadcast
    const { error } = await supabaseAdmin
      .from('broadcasts')
      .delete()
      .eq('id', broadcastId);

    if (error) {
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete broadcast error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
