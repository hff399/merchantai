import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Note: This is a placeholder for the actual Telegram userbot integration
// In production, you would use gram.js or similar library with user accounts
export async function POST(request: NextRequest) {
  try {
    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Get lead details
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('outreach_leads')
      .select(`
        *,
        outreach_campaigns(dm_templates)
      `)
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Get available outreach account
    const { data: account, error: accountError } = await supabaseAdmin
      .from('outreach_accounts')
      .select('*')
      .eq('status', 'connected')
      .lt('daily_messages_sent', supabaseAdmin.rpc('get_daily_limit'))
      .order('daily_messages_sent', { ascending: true })
      .limit(1)
      .single();

    if (accountError || !account) {
      return NextResponse.json(
        { error: 'No available outreach accounts' },
        { status: 400 }
      );
    }

    // TODO: Implement actual Telegram userbot DM sending
    // This would require:
    // 1. Using gram.js or telegram library
    // 2. Loading the session from account.session_string
    // 3. Sending message to lead.telegram_id or lead.username
    // 4. Handling rate limits and errors

    // For now, just mark as sent (placeholder)
    const dmTemplates = lead.outreach_campaigns?.dm_templates || [];
    const templateIndex = 0;

    await supabaseAdmin
      .from('outreach_leads')
      .update({
        dm_sent: true,
        dm_sent_at: new Date().toISOString(),
        dm_template_used: templateIndex,
        status: 'contacted',
        updated_at: new Date().toISOString(),
      })
      .eq('id', leadId);

    // Update account stats
    await supabaseAdmin
      .from('outreach_accounts')
      .update({
        daily_messages_sent: account.daily_messages_sent + 1,
        total_messages_sent: account.total_messages_sent + 1,
        last_message_at: new Date().toISOString(),
      })
      .eq('id', account.id);

    // Log the message
    await supabaseAdmin
      .from('outreach_messages')
      .insert({
        campaign_id: lead.campaign_id,
        account_id: account.id,
        lead_id: leadId,
        direction: 'out',
        message: dmTemplates[templateIndex]?.text || 'Default DM',
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Send DM error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
