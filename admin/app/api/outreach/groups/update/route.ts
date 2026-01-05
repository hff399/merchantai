import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { groupId, status, category, notes } = await request.json();

    if (!groupId) {
      return NextResponse.json(
        { error: 'Group ID is required' },
        { status: 400 }
      );
    }

    const updates: any = { updated_at: new Date().toISOString() };
    if (status) updates.status = status;
    if (category !== undefined) updates.category = category;
    if (notes !== undefined) updates.notes = notes;

    const { error } = await supabaseAdmin
      .from('outreach_groups')
      .update(updates)
      .eq('id', groupId);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update group' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update group error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
