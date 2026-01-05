import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendBulkMessages } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const { 
      title, 
      message, 
      parseMode, 
      targetType, 
      targetTags,
      targetUserIds,
      sendNow 
    } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get recipients based on target type
    let query = supabaseAdmin
      .from('users')
      .select('id, telegram_id')
      .eq('is_blocked', false);

    if (targetType === 'segment' && targetTags?.length > 0) {
      query = query.overlaps('tags', targetTags);
    } else if (targetType === 'specific' && targetUserIds?.length > 0) {
      query = query.in('id', targetUserIds);
    }

    const { data: recipients, error: recipientsError } = await query;

    if (recipientsError) {
      return NextResponse.json(
        { error: 'Failed to fetch recipients' },
        { status: 500 }
      );
    }

    // Create broadcast record
    const { data: broadcast, error: createError } = await supabaseAdmin
      .from('broadcasts')
      .insert({
        title,
        message,
        message_html: parseMode === 'HTML' ? message : null,
        parse_mode: parseMode,
        target_type: targetType,
        target_tags: targetTags || [],
        target_user_ids: targetUserIds || [],
        total_recipients: recipients?.length || 0,
        status: sendNow ? 'sending' : 'draft',
      })
      .select()
      .single();

    if (createError) {
      return NextResponse.json(
        { error: 'Failed to create broadcast' },
        { status: 500 }
      );
    }

    // If sendNow, start sending
    if (sendNow && recipients && recipients.length > 0) {
      // Create recipient records
      const recipientRecords = recipients.map(r => ({
        broadcast_id: broadcast.id,
        user_id: r.id,
        status: 'pending',
      }));

      await supabaseAdmin
        .from('broadcast_recipients')
        .insert(recipientRecords);

      // Send messages (this runs in background for large lists)
      const messages = recipients.map(r => ({
        chat_id: r.telegram_id,
        text: message,
        parse_mode: parseMode as 'HTML' | 'Markdown',
      }));

      // For small lists, send immediately
      if (messages.length <= 100) {
        const result = await sendBulkMessages(messages);

        // Update broadcast status
        await supabaseAdmin
          .from('broadcasts')
          .update({
            status: 'completed',
            sent_count: result.success,
            failed_count: result.failed,
            completed_at: new Date().toISOString(),
          })
          .eq('id', broadcast.id);
      } else {
        // For large lists, would need a background job
        // For now, just mark as sending
        // In production, use a queue like Bull or a serverless function
      }
    }

    return NextResponse.json({ 
      success: true, 
      broadcastId: broadcast.id,
      recipientCount: recipients?.length || 0,
    });
  } catch (error) {
    console.error('Create broadcast error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
