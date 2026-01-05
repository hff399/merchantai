import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const { title, message, parse_mode, target_type, target_tags, status, scheduled_at } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get recipient count
    let recipientQuery = supabaseAdmin
      .from('users')
      .select('id, telegram_id', { count: 'exact' })
      .eq('is_blocked', false);

    if (target_type === 'tags' && target_tags?.length > 0) {
      recipientQuery = recipientQuery.overlaps('tags', target_tags);
    }

    const { data: recipients, count } = await recipientQuery;

    // Create broadcast
    const { data: broadcast, error } = await supabaseAdmin
      .from('broadcasts')
      .insert({
        title,
        message,
        parse_mode: parse_mode || 'HTML',
        target_type,
        target_tags,
        total_recipients: count || 0,
        status: status || 'draft',
        scheduled_at: scheduled_at || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Create broadcast error:', error);
      return NextResponse.json({ error: 'Failed to create broadcast' }, { status: 500 });
    }

    // If sending now, start sending
    if (status === 'sending' && recipients && recipients.length > 0) {
      // Insert recipients
      const recipientRecords = recipients.map(r => ({
        broadcast_id: broadcast.id,
        user_id: r.id,
        status: 'pending',
      }));

      await supabaseAdmin.from('broadcast_recipients').insert(recipientRecords);

      // Send in background (for small batches, send directly)
      if (recipients.length <= 100) {
        let sentCount = 0;
        let failedCount = 0;

        for (const recipient of recipients) {
          try {
            await sendTelegramMessage(recipient.telegram_id, message, parse_mode);
            await supabaseAdmin
              .from('broadcast_recipients')
              .update({ status: 'sent', sent_at: new Date().toISOString() })
              .eq('broadcast_id', broadcast.id)
              .eq('user_id', recipient.id);
            sentCount++;
          } catch (err: any) {
            await supabaseAdmin
              .from('broadcast_recipients')
              .update({ status: 'failed', error_message: err.message })
              .eq('broadcast_id', broadcast.id)
              .eq('user_id', recipient.id);
            failedCount++;
          }
          
          // Small delay to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        // Update broadcast status
        await supabaseAdmin
          .from('broadcasts')
          .update({
            sent_count: sentCount,
            failed_count: failedCount,
            status: 'completed',
            completed_at: new Date().toISOString(),
          })
          .eq('id', broadcast.id);
      } else {
        // For large batches, mark as sending and handle in background job
        await supabaseAdmin
          .from('broadcasts')
          .update({ status: 'sending', started_at: new Date().toISOString() })
          .eq('id', broadcast.id);
      }
    }

    return NextResponse.json({ success: true, broadcast });
  } catch (error) {
    console.error('Create broadcast error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
