# app/api/broadcasts/count/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { target_type, target_tags } = await request.json();

    let query = supabaseAdmin
      .from('users')
      .select('id', { count: 'exact', head: true })
      .eq('is_blocked', false);

    if (target_type === 'tags' && target_tags?.length > 0) {
      query = query.overlaps('tags', target_tags);
    }

    const { count } = await query;

    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error('Count error:', error);
    return NextResponse.json({ count: 0 });
  }
}

```

# app/api/broadcasts/create/route.ts

```ts
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

```

# app/api/broadcasts/delete/route.ts

```ts
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

```

# app/api/broadcasts/list/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || '';
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('broadcasts')
      .select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    query = query.order(sort, { ascending: order === 'asc' });

    const { data, count, error } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error('Broadcasts query error:', error);
      return NextResponse.json({ broadcasts: [], total: 0 });
    }

    return NextResponse.json({
      broadcasts: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error('Broadcasts list error:', error);
    return NextResponse.json({ broadcasts: [], total: 0 });
  }
}

```

# app/api/broadcasts/tags/route.ts

```ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from('users')
      .select('tags');

    const tagSet = new Set<string>();
    data?.forEach(user => {
      user.tags?.forEach((tag: string) => tagSet.add(tag));
    });

    return NextResponse.json({ tags: Array.from(tagSet).sort() });
  } catch (error) {
    console.error('Tags error:', error);
    return NextResponse.json({ tags: [] });
  }
}

```

# app/api/broadcasts/templates/create/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { name, message, parse_mode } = await request.json();

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('broadcast_templates')
      .insert({
        name,
        message,
        parse_mode: parse_mode || 'HTML',
      })
      .select()
      .single();

    if (error) {
      console.error('Create template error:', error);
      return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
    }

    return NextResponse.json({ success: true, template: data });
  } catch (error) {
    console.error('Create template error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

```

# app/api/broadcasts/templates/delete/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { templateId } = await request.json();

    if (!templateId) {
      return NextResponse.json({ error: 'Template ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('broadcast_templates')
      .delete()
      .eq('id', templateId);

    if (error) {
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete template error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

```

# app/api/broadcasts/templates/list/route.ts

```ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('broadcast_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Templates query error:', error);
      return NextResponse.json({ templates: [] });
    }

    return NextResponse.json({ templates: data || [] });
  } catch (error) {
    console.error('Templates list error:', error);
    return NextResponse.json({ templates: [] });
  }
}

```

# app/api/outreach/accounts/check/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkConnection } from '@/lib/gramjs';

export async function POST(request: NextRequest) {
  try {
    const { accountId } = await request.json();

    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    // Get account
    const { data: account, error: fetchError } = await supabaseAdmin
      .from('outreach_accounts')
      .select('*')
      .eq('id', accountId)
      .single();

    if (fetchError || !account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    if (!account.session_string) {
      return NextResponse.json(
        { error: 'Account not authenticated' },
        { status: 400 }
      );
    }

    const result = await checkConnection(
      parseInt(account.api_id),
      account.api_hash,
      account.session_string
    );

    // Update status based on result
    await supabaseAdmin
      .from('outreach_accounts')
      .update({
        status: result.connected ? 'connected' : 'disconnected',
        updated_at: new Date().toISOString(),
      })
      .eq('id', accountId);

    return NextResponse.json({
      success: true,
      connected: result.connected,
      user: result.user,
      error: result.error,
    });
  } catch (error) {
    console.error('Check connection error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

```

# app/api/outreach/accounts/create/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { phone, api_id, api_hash, name, daily_limit } = await request.json();

    // Validate required fields
    if (!phone || !api_id || !api_hash) {
      return NextResponse.json(
        { error: 'Phone, API ID and API Hash are required' },
        { status: 400 }
      );
    }

    // Validate phone format
    const cleanPhone = phone.trim();
    if (!cleanPhone.startsWith('+')) {
      return NextResponse.json(
        { error: 'Phone must start with + (e.g. +79001234567)' },
        { status: 400 }
      );
    }

    // Validate API ID (should be a number)
    const cleanApiId = String(api_id).trim();
    if (!/^\d+$/.test(cleanApiId)) {
      return NextResponse.json(
        { error: 'API ID must be a number' },
        { status: 400 }
      );
    }

    // Validate API Hash (should be 32 hex characters)
    const cleanApiHash = api_hash.trim();
    if (cleanApiHash.length < 20) {
      return NextResponse.json(
        { error: 'API Hash seems invalid. Get it from my.telegram.org' },
        { status: 400 }
      );
    }

    // Check if phone already exists
    const { data: existing } = await supabaseAdmin
      .from('outreach_accounts')
      .select('id')
      .eq('phone', cleanPhone)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Account with this phone already exists' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('outreach_accounts')
      .insert({
        phone: cleanPhone,
        api_id: cleanApiId,
        api_hash: cleanApiHash,
        name: name || null,
        daily_limit: daily_limit || 40,
        status: 'pending_verification',
      })
      .select()
      .single();

    if (error) {
      console.error('Create account error:', error);
      return NextResponse.json(
        { error: 'Failed to create account' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, account: data });
  } catch (error) {
    console.error('Create account error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

# app/api/outreach/accounts/delete/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { accountId } = await request.json();

    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('outreach_accounts')
      .delete()
      .eq('id', accountId);

    if (error) {
      console.error('Delete account error:', error);
      return NextResponse.json(
        { error: 'Failed to delete account' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

```

# app/api/outreach/accounts/list/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || '';
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('outreach_accounts')
      .select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    query = query.order(sort, { ascending: order === 'asc' });

    const { data, count, error } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error('Accounts query error:', error);
      return NextResponse.json({ accounts: [], total: 0 });
    }

    return NextResponse.json({
      accounts: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error('Accounts list error:', error);
    return NextResponse.json({ accounts: [], total: 0 });
  }
}

```

# app/api/outreach/accounts/send-code/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendVerificationCode } from '@/lib/gramjs';

export async function POST(request: NextRequest) {
  try {
    const { accountId } = await request.json();

    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    // Get account
    const { data: account, error: fetchError } = await supabaseAdmin
      .from('outreach_accounts')
      .select('*')
      .eq('id', accountId)
      .single();

    if (fetchError || !account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    // Validate API credentials
    const apiId = Number(account.api_id);
    const apiHash = String(account.api_hash).trim();
    const phone = String(account.phone).trim();

    console.log('Sending code to:', { phone, apiId, apiHashLength: apiHash.length });

    if (!apiId || isNaN(apiId)) {
      return NextResponse.json(
        { error: 'Invalid API ID. Must be a number.' },
        { status: 400 }
      );
    }

    if (!apiHash || apiHash.length < 20) {
      return NextResponse.json(
        { error: 'Invalid API Hash. Check your credentials from my.telegram.org' },
        { status: 400 }
      );
    }

    if (!phone || !phone.startsWith('+')) {
      return NextResponse.json(
        { error: 'Phone must start with + (e.g. +79001234567)' },
        { status: 400 }
      );
    }

    // Send verification code
    const result = await sendVerificationCode(
      accountId,
      phone,
      apiId,
      apiHash
    );

    if (!result.success) {
      console.error('Verification failed:', result.error);
      return NextResponse.json(
        { error: result.error || 'Failed to send code' },
        { status: 400 }
      );
    }

    // Update account status
    await supabaseAdmin
      .from('outreach_accounts')
      .update({
        status: 'awaiting_code',
        updated_at: new Date().toISOString(),
      })
      .eq('id', accountId);

    return NextResponse.json({ 
      success: true,
      message: 'Verification code sent to phone',
    });
  } catch (error: any) {
    console.error('Send code error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
```

# app/api/outreach/accounts/verify-code/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyCode, checkConnection } from '@/lib/gramjs';

export async function POST(request: NextRequest) {
  try {
    const { accountId, code, password } = await request.json();

    if (!accountId || !code) {
      return NextResponse.json(
        { error: 'Account ID and code are required' },
        { status: 400 }
      );
    }

    // Get account
    const { data: account, error: fetchError } = await supabaseAdmin
      .from('outreach_accounts')
      .select('*')
      .eq('id', accountId)
      .single();

    if (fetchError || !account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    // Verify code
    const result = await verifyCode(accountId, code, password);
    console.log("!!!!!!" + result.error)

    if (!result.success) {
      if (result.error === '2FA_REQUIRED') {
        // Update status and request password
        await supabaseAdmin
          .from('outreach_accounts')
          .update({
            status: 'awaiting_2fa',
            updated_at: new Date().toISOString(),
          })
          .eq('id', accountId);

        return NextResponse.json(
          { error: '2FA_REQUIRED', message: 'Two-factor authentication required' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: result.error || 'Failed to verify code' },
        { status: 400 }
      );
    }

    // Get user info
    const connectionCheck = await checkConnection(
      parseInt(account.api_id),
      account.api_hash,
      result.sessionString!
    );

    // Update account with session and connected status
    await supabaseAdmin
      .from('outreach_accounts')
      .update({
        session_string: result.sessionString,
        status: 'connected',
        telegram_id: connectionCheck.user?.id ? parseInt(connectionCheck.user.id) : null,
        telegram_username: connectionCheck.user?.username || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', accountId);

    return NextResponse.json({ 
      success: true,
      message: 'Account connected successfully',
      user: connectionCheck.user,
    });
  } catch (error) {
    console.error('Verify code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

```

# app/api/outreach/campaigns/create/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { name, group_message, target_categories, dm_templates, delay_between_messages } = await request.json();

    if (!name || !group_message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('outreach_campaigns')
      .insert({
        name,
        group_message,
        target_categories: target_categories || [],
        dm_templates: dm_templates || [],
        delay_between_messages: delay_between_messages || 300,
        status: 'draft',
      })
      .select()
      .single();

    if (error) {
      console.error('Create campaign error:', error);
      return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
    }

    return NextResponse.json({ success: true, campaign: data });
  } catch (error) {
    console.error('Create campaign error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

```

# app/api/outreach/campaigns/delete/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { campaignId } = await request.json();

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('outreach_campaigns')
      .delete()
      .eq('id', campaignId);

    if (error) {
      console.error('Delete campaign error:', error);
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete campaign error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

```

# app/api/outreach/campaigns/list/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || '';
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('outreach_campaigns')
      .select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    query = query.order(sort, { ascending: order === 'asc' });

    const { data, count, error } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error('Campaigns query error:', error);
      return NextResponse.json({ campaigns: [], total: 0 });
    }

    return NextResponse.json({
      campaigns: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error('Campaigns list error:', error);
    return NextResponse.json({ campaigns: [], total: 0 });
  }
}

```

# app/api/outreach/campaigns/update/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { campaignId, status, name, group_message } = await request.json();

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    const updates: any = { updated_at: new Date().toISOString() };
    if (status) updates.status = status;
    if (name) updates.name = name;
    if (group_message) updates.group_message = group_message;

    // If activating, set started_at
    if (status === 'active') {
      updates.started_at = new Date().toISOString();
    }

    const { error } = await supabaseAdmin
      .from('outreach_campaigns')
      .update(updates)
      .eq('id', campaignId);

    if (error) {
      console.error('Update campaign error:', error);
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update campaign error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

```

# app/api/outreach/groups/bulk-create/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { groups } = await request.json();

    if (!Array.isArray(groups) || groups.length === 0) {
      return NextResponse.json({ error: 'Groups array is required' }, { status: 400 });
    }

    const groupsWithStatus = groups.map(g => ({
      ...g,
      status: 'active',
    }));

    const { data, error } = await supabaseAdmin
      .from('outreach_groups')
      .insert(groupsWithStatus)
      .select();

    if (error) {
      console.error('Bulk create error:', error);
      return NextResponse.json({ error: 'Failed to create groups' }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: data?.length || 0 });
  } catch (error) {
    console.error('Bulk create error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

```

# app/api/outreach/groups/create/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { title, username, category, member_count } = await request.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('outreach_groups')
      .insert({
        title,
        username: username || null,
        category: category || null,
        member_count: member_count || null,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Create group error:', error);
      return NextResponse.json({ error: 'Failed to create group' }, { status: 500 });
    }

    return NextResponse.json({ success: true, group: data });
  } catch (error) {
    console.error('Create group error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

```

# app/api/outreach/groups/delete/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { groupId } = await request.json();

    if (!groupId) {
      return NextResponse.json({ error: 'Group ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('outreach_groups')
      .delete()
      .eq('id', groupId);

    if (error) {
      console.error('Delete group error:', error);
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete group error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

```

# app/api/outreach/groups/list/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('outreach_groups')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (category) {
      query = query.eq('category', category);
    }

    query = query.order(sort, { ascending: order === 'asc' });

    const { data, count, error } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error('Groups query error:', error);
      return NextResponse.json({ groups: [], total: 0, categories: [] });
    }

    // Get unique categories
    const { data: catData } = await supabaseAdmin
      .from('outreach_groups')
      .select('category')
      .not('category', 'is', null);

    const categories = [...new Set(catData?.map(g => g.category).filter(Boolean) || [])];

    return NextResponse.json({
      groups: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
      categories,
    });
  } catch (error) {
    console.error('Groups list error:', error);
    return NextResponse.json({ groups: [], total: 0, categories: [] });
  }
}

```

# app/api/outreach/groups/update/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { groupId, status, category, notes } = await request.json();

    if (!groupId) {
      return NextResponse.json({ error: 'Group ID is required' }, { status: 400 });
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
      console.error('Update group error:', error);
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update group error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

```

# app/api/outreach/leads/list/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const campaign = searchParams.get('campaign') || '';
    const dmSent = searchParams.get('dm') || '';
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('outreach_leads')
      .select(`
        *,
        outreach_campaigns(name)
      `, { count: 'exact' });

    // Search filter
    if (search) {
      query = query.or(`username.ilike.%${search}%,first_name.ilike.%${search}%`);
    }

    // Status filter
    if (status) {
      query = query.eq('status', status);
    }

    // Campaign filter
    if (campaign) {
      query = query.eq('campaign_id', campaign);
    }

    // DM sent filter
    if (dmSent === 'true') {
      query = query.eq('dm_sent', true);
    } else if (dmSent === 'false') {
      query = query.eq('dm_sent', false);
    }

    // Sorting
    query = query.order(sort, { ascending: order === 'asc' });

    // Pagination
    const { data, count, error } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error('Leads query error:', error);
      return NextResponse.json({ leads: [], total: 0 });
    }

    // Transform data to include campaign name
    const leads = data?.map(lead => ({
      ...lead,
      campaign_name: lead.outreach_campaigns?.name || null,
    })) || [];

    return NextResponse.json({
      leads,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error('Leads list error:', error);
    return NextResponse.json({ leads: [], total: 0 });
  }
}

```

# app/api/outreach/leads/send-dm/route.ts

```ts
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

```

# app/api/outreach/leads/update/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { leadId, status, notes } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    const updates: any = { updated_at: new Date().toISOString() };
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    const { error } = await supabaseAdmin
      .from('outreach_leads')
      .update(updates)
      .eq('id', leadId);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update lead error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

```

# app/api/prompts/route.ts

```ts
// Prompt templates for AI services
// These can be overridden from database via admin panel

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: string[]; // List of variables that can be used in template
  category: 'card_generation' | 'image_edit' | 'photo_session' | 'other';
  isSystem: boolean; // System prompts vs user prompts
}

// ============================================
// CARD GENERATION PROMPTS
// ============================================

export const FIRST_SLIDE_SYSTEM_PROMPT = `You're a professional prompt writer for Gemini image generation (nano banana pro).

Your task is to create a prompt for generating a premium e-commerce marketplace card.

You receive:
1. A user request describing what they want
2. Multiple input images with ROLE ATTRIBUTIONS explaining how each should be used

IMAGE ROLES:
- [PRODUCT]: Main product - NEVER modify or stylize
- [STYLE REFERENCE]: Match this style EXACTLY - colors, typography, layout, mood
- [INSPIRATION]: Use for creative ideas, don't copy exactly
- [BACKGROUND]: Use similar background style
- [ELEMENT]: Incorporate this design element
- [LOGO]: Place logo appropriately
- [PREVIOUS SLIDE]: Match for carousel consistency

OUTPUT RULES:
1. Write ONLY the prompt text for image generation
2. Prompt in ENGLISH, Russian text on card in RUSSIAN
3. Reference images: "From IMAGE 1 (product)...", "Match style of IMAGE 2..."
4. Be extremely detailed about composition, lighting, layout

PROMPT STRUCTURE:
Ultra-high quality commercial product poster.

IMAGE USAGE:
- IMAGE 1 (product): [how to use]
- IMAGE 2 (style): [how to use]
[etc.]

COMPOSITION & LAYOUT:
[detailed description]

BACKGROUND & ENVIRONMENT:
[based on references]

TYPOGRAPHY (RUSSIAN text):
[headlines, badges, callouts]

LIGHTING & ATMOSPHERE:
[detailed description]

QUALITY:
- Ultra-high resolution, photorealistic
- Premium commercial aesthetic

NEGATIVE PROMPT:
[unwanted elements]`;

export const NEXT_SLIDE_SYSTEM_PROMPT = `You're creating a CAROUSEL SLIDE (NOT the first slide).

CRITICAL REQUIREMENTS:
1. Must look like same carousel as slide 1
2. EXACT same visual style, colors, typography, design language
3. Only CONTENT changes based on user request
4. Product from IMAGE 1 must be featured

IMAGE ROLES:
- [PRODUCT]: Main product - NEVER modify
- [STYLE REFERENCE]: First slide - MATCH EXACTLY
- [PREVIOUS SLIDE]: Earlier slides - maintain consistency
- Other images: Additional references

OUTPUT: Write ONLY the prompt text.
English prompt, Russian text on card.
Emphasize style consistency.

PROMPT STRUCTURE:
Carousel slide [N] - MATCH SLIDE 1 STYLE EXACTLY.

STYLE CONSISTENCY (from style reference):
- Same colors, typography, badges
- Same lighting mood, aesthetic

IMAGE USAGE:
[how each image is used]

THIS SLIDE SHOWS:
[user's request]

COMPOSITION:
[layout for this slide]

QUALITY:
- Match slide 1 exactly
- Cohesive carousel look

NEGATIVE PROMPT:
[unwanted, style inconsistencies]`;

export const FIRST_SLIDE_USER_PROMPT = `USER REQUEST:
{{userPrompt}}

INPUT IMAGES ({{imageCount}} total):
{{imageContext}}

Generate a professional e-commerce marketplace card using these images according to their roles.`;

export const NEXT_SLIDE_USER_PROMPT = `CAROUSEL SLIDE {{slideNumber}} - MUST MATCH SLIDE 1 STYLE

USER REQUEST:
{{userPrompt}}

INPUT IMAGES ({{imageCount}} total):
{{imageContext}}
{{styleReference}}
{{previousSlides}}

Maintain EXACT visual consistency with slide 1. Same colors, typography, layout style, mood.`;

// ============================================
// IMAGE EDIT PROMPTS
// ============================================

export const IMAGE_EDIT_SYSTEM_PROMPT = `You're a professional image editor using AI.

Your task is to modify the provided image according to user instructions.

RULES:
1. Preserve the main subject unless asked to change it
2. Make changes look natural and seamless
3. Maintain image quality and resolution
4. Follow user instructions precisely

OUTPUT: Write a detailed prompt for the image editing model describing exactly what changes to make.`;

export const IMAGE_EDIT_USER_PROMPT = `ORIGINAL IMAGE: Attached

USER REQUEST:
{{userPrompt}}

Describe the exact modifications to make to this image.`;

// ============================================
// PHOTO SESSION PROMPTS
// ============================================

export const PHOTO_SESSION_SYSTEM_PROMPT = `You're creating a professional product photo session.

Your task is to generate multiple product shots from different angles and in different settings.

RULES:
1. Keep product consistent across all shots
2. Vary angles, lighting, and backgrounds
3. Maintain professional commercial quality
4. Create shots suitable for e-commerce

Generate {{count}} different product photos.`;

// ============================================
// IMAGE ROLE DESCRIPTIONS
// ============================================

export const IMAGE_ROLE_DESCRIPTIONS: Record<string, string> = {
  product: 'PRODUCT - Main product photo. DO NOT modify the product itself, use it as the central element',
  style_reference: 'STYLE REFERENCE - Match this visual style EXACTLY: colors, typography, layout, mood, design language',
  previous_slide: 'PREVIOUS SLIDE - Maintain perfect visual consistency with this carousel slide',
  inspiration: 'INSPIRATION - Use as creative reference for layout, composition, and style ideas',
  background: 'BACKGROUND - Use similar background style, colors, texture, and atmosphere',
  element: 'ELEMENT - Incorporate this design element into the card',
  logo: 'LOGO - Brand logo to place appropriately, maintain original proportions',
  other: 'REFERENCE - Additional reference image',
};

// ============================================
// DEFAULT TEMPLATES (for database seeding)
// ============================================

export const DEFAULT_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'first_slide_system',
    name: 'First Slide - System Prompt',
    description: 'System prompt for generating the first slide of a carousel or single card',
    template: FIRST_SLIDE_SYSTEM_PROMPT,
    variables: [],
    category: 'card_generation',
    isSystem: true,
  },
  {
    id: 'first_slide_user',
    name: 'First Slide - User Prompt',
    description: 'User prompt template for the first slide',
    template: FIRST_SLIDE_USER_PROMPT,
    variables: ['userPrompt', 'imageCount', 'imageContext'],
    category: 'card_generation',
    isSystem: false,
  },
  {
    id: 'next_slide_system',
    name: 'Next Slide - System Prompt',
    description: 'System prompt for generating subsequent carousel slides',
    template: NEXT_SLIDE_SYSTEM_PROMPT,
    variables: [],
    category: 'card_generation',
    isSystem: true,
  },
  {
    id: 'next_slide_user',
    name: 'Next Slide - User Prompt',
    description: 'User prompt template for subsequent slides',
    template: NEXT_SLIDE_USER_PROMPT,
    variables: ['slideNumber', 'userPrompt', 'imageCount', 'imageContext', 'styleReference', 'previousSlides'],
    category: 'card_generation',
    isSystem: false,
  },
  {
    id: 'image_edit_system',
    name: 'Image Edit - System Prompt',
    description: 'System prompt for image editing',
    template: IMAGE_EDIT_SYSTEM_PROMPT,
    variables: [],
    category: 'image_edit',
    isSystem: true,
  },
  {
    id: 'image_edit_user',
    name: 'Image Edit - User Prompt',
    description: 'User prompt template for image editing',
    template: IMAGE_EDIT_USER_PROMPT,
    variables: ['userPrompt'],
    category: 'image_edit',
    isSystem: false,
  },
  {
    id: 'photo_session_system',
    name: 'Photo Session - System Prompt',
    description: 'System prompt for photo session generation',
    template: PHOTO_SESSION_SYSTEM_PROMPT,
    variables: ['count'],
    category: 'photo_session',
    isSystem: true,
  },
];

// ============================================
// TEMPLATE RENDERING
// ============================================

/**
 * Render a template with variables
 */
export function renderTemplate(template: string, variables: Record<string, string | number>): string {
  let result = template;
  
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, String(value));
  }
  
  return result;
}

/**
 * Build image context string from image roles
 */
export function buildImageContext(images: Array<{ role: string; description?: string }>): string {
  let context = '';
  
  images.forEach((img, idx) => {
    const roleDesc = IMAGE_ROLE_DESCRIPTIONS[img.role] || IMAGE_ROLE_DESCRIPTIONS['other'];
    context += `IMAGE ${idx + 1} [${roleDesc}]`;
    if (img.description) {
      context += `\nUser note: ${img.description}`;
    }
    context += '\n\n';
  });
  
  return context;
}
```

# app/api/users/give-credits/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userId, amount } = await request.json();

    if (!userId || amount === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get current credits
    const { data: user, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();

    if (fetchError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update credits
    const newCredits = user.credits + amount;

    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ 
        credits: newCredits,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update credits' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, newCredits });
  } catch (error) {
    console.error('Give credits error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

```

# app/api/users/send-message/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { sendMessage } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const { telegramId, message, parseMode } = await request.json();

    if (!telegramId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sendMessage({
      chat_id: telegramId,
      text: message,
      parse_mode: parseMode || 'HTML',
    });

    console.log(result)

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

```

# app/api/users/toggle-block/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userId, block } = await request.json();

    if (!userId || block === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('users')
      .update({ 
        is_blocked: block,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Toggle block error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

```

# app/api/users/update-tags/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userId, tags } = await request.json();

    if (!userId || !Array.isArray(tags)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('users')
      .update({ 
        tags,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update tags' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update tags error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

```

# app/broadcasts/page.tsx

```tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  Plus,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Users,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Play,
  Pause,
  Trash2,
  Copy,
  MoreVertical,
  Eye
} from 'lucide-react';

interface Broadcast {
  id: string;
  title: string;
  message: string;
  parse_mode: string;
  target_type: string;
  target_tags: string[];
  total_recipients: number;
  sent_count: number;
  failed_count: number;
  status: string;
  scheduled_at: string | null;
  created_at: string;
}

interface Template {
  id: string;
  name: string;
  message: string;
  parse_mode: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  draft: { label: 'Черновик', icon: FileText, color: 'bg-gray-100 text-gray-700' },
  scheduled: { label: 'Запланирована', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
  sending: { label: 'Отправка', icon: Send, color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Завершена', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
  failed: { label: 'Ошибка', icon: XCircle, color: 'bg-red-100 text-red-700' },
  paused: { label: 'Приостановлена', icon: Pause, color: 'bg-orange-100 text-orange-700' },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
  });
}

export default function BroadcastsPage() {
  const [tab, setTab] = useState<'broadcasts' | 'templates'>('broadcasts');
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState<Broadcast | null>(null);
  const [showMenuId, setShowMenuId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    parse_mode: 'HTML',
    target_type: 'all',
    target_tags: [] as string[],
    scheduled_at: '',
  });
  const [templateForm, setTemplateForm] = useState({
    name: '',
    message: '',
    parse_mode: 'HTML',
  });
  const [allTags, setAllTags] = useState<string[]>([]);
  const [recipientCount, setRecipientCount] = useState(0);

  const fetchBroadcasts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    params.set('sort', sort);
    params.set('order', order);
    params.set('page', String(page));

    try {
      const res = await fetch(`/api/broadcasts/list?${params.toString()}`);
      const data = await res.json();
      setBroadcasts(data.broadcasts || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch broadcasts:', err);
    }
    setLoading(false);
  }, [status, sort, order, page]);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/broadcasts/templates/list');
      const data = await res.json();
      setTemplates(data.templates || []);
    } catch (err) {
      console.error('Failed to fetch templates:', err);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await fetch('/api/broadcasts/tags');
      const data = await res.json();
      setAllTags(data.tags || []);
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  };

  const fetchRecipientCount = async () => {
    try {
      const res = await fetch('/api/broadcasts/count', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_type: formData.target_type,
          target_tags: formData.target_tags,
        }),
      });
      const data = await res.json();
      setRecipientCount(data.count || 0);
    } catch (err) {
      console.error('Failed to fetch count:', err);
    }
  };

  useEffect(() => {
    if (tab === 'broadcasts') {
      fetchBroadcasts();
    } else {
      fetchTemplates();
    }
    fetchTags();
  }, [tab, fetchBroadcasts]);

  useEffect(() => {
    if (showCreateModal) {
      fetchRecipientCount();
    }
  }, [formData.target_type, formData.target_tags, showCreateModal]);

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setSort(field);
      setOrder('desc');
    }
  };

  const handleCreateBroadcast = async (sendNow: boolean) => {
    if (!formData.message.trim()) {
      toast.error('Введите текст сообщения');
      return;
    }

    setActionLoading('create');
    try {
      const res = await fetch('/api/broadcasts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: sendNow ? 'sending' : 'draft',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(sendNow ? 'Рассылка запущена' : 'Черновик сохранён');
        setShowCreateModal(false);
        setFormData({ title: '', message: '', parse_mode: 'HTML', target_type: 'all', target_tags: [], scheduled_at: '' });
        fetchBroadcasts();
      } else {
        toast.error(data.error || 'Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSaveTemplate = async () => {
    if (!templateForm.name.trim() || !templateForm.message.trim()) {
      toast.error('Заполните название и текст');
      return;
    }

    setActionLoading('template');
    try {
      const res = await fetch('/api/broadcasts/templates/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateForm),
      });

      if (res.ok) {
        toast.success('Шаблон сохранён');
        setShowTemplateModal(false);
        setTemplateForm({ name: '', message: '', parse_mode: 'HTML' });
        fetchTemplates();
      } else {
        toast.error('Ошибка сохранения');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteBroadcast = async (id: string) => {
    if (!confirm('Удалить рассылку?')) return;
    
    setActionLoading(id);
    try {
      const res = await fetch('/api/broadcasts/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ broadcastId: id }),
      });

      if (res.ok) {
        toast.success('Рассылка удалена');
        fetchBroadcasts();
      } else {
        toast.error('Ошибка удаления');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
      setShowMenuId(null);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm('Удалить шаблон?')) return;
    
    try {
      const res = await fetch('/api/broadcasts/templates/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: id }),
      });

      if (res.ok) {
        toast.success('Шаблон удалён');
        fetchTemplates();
      } else {
        toast.error('Ошибка удаления');
      }
    } catch (error) {
      toast.error('Ошибка');
    }
  };

  const handleUseTemplate = (template: Template) => {
    setFormData({
      ...formData,
      message: template.message,
      parse_mode: template.parse_mode,
    });
    setShowCreateModal(true);
  };

  const handleDuplicate = (broadcast: Broadcast) => {
    setFormData({
      title: `${broadcast.title} (копия)`,
      message: broadcast.message,
      parse_mode: broadcast.parse_mode,
      target_type: broadcast.target_type,
      target_tags: broadcast.target_tags || [],
      scheduled_at: '',
    });
    setShowCreateModal(true);
    setShowMenuId(null);
  };

  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button onClick={() => handleSort(field)} className="flex items-center gap-1 hover:text-gray-900">
      {children}
      {sort === field ? (
        order === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-30" />
      )}
    </button>
  );

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Рассылки</h1>
          <p className="text-gray-500">{tab === 'broadcasts' ? `Всего: ${total}` : `Шаблонов: ${templates.length}`}</p>
        </div>
        <div className="flex gap-2">
          {tab === 'templates' && (
            <button
              onClick={() => setShowTemplateModal(true)}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Новый шаблон
            </button>
          )}
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Новая рассылка
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setTab('broadcasts')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              tab === 'broadcasts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Рассылки
          </button>
          <button
            onClick={() => setTab('templates')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              tab === 'templates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Шаблоны
          </button>
        </div>

        {tab === 'broadcasts' && (
          <>
            {/* Filters */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-wrap gap-4">
                <select
                  value={status}
                  onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                  className="px-4 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="">Все статусы</option>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : broadcasts.length === 0 ? (
              <div className="p-12 text-center">
                <Send className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Нет рассылок</h3>
                <p className="text-gray-500">Создайте первую рассылку</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Рассылка</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Аудитория</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      <SortButton field="sent_count">Отправлено</SortButton>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      <SortButton field="created_at">Дата</SortButton>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {broadcasts.map((broadcast) => {
                    const statusInfo = statusConfig[broadcast.status] || statusConfig.draft;
                    const StatusIcon = statusInfo.icon;

                    return (
                      <tr key={broadcast.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{broadcast.title || 'Без названия'}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{broadcast.message.substring(0, 50)}...</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${statusInfo.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            {broadcast.total_recipients}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="text-green-600">{broadcast.sent_count}</span>
                          {broadcast.failed_count > 0 && (
                            <span className="text-red-600 ml-2">/ {broadcast.failed_count} ошибок</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(broadcast.created_at)}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="relative inline-block">
                            <button
                              onClick={() => setShowMenuId(showMenuId === broadcast.id ? null : broadcast.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                              <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>

                            {showMenuId === broadcast.id && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowMenuId(null)} />
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                  <button
                                    onClick={() => { setShowPreviewModal(broadcast); setShowMenuId(null); }}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                  >
                                    <Eye className="w-4 h-4" />
                                    Просмотр
                                  </button>
                                  <button
                                    onClick={() => handleDuplicate(broadcast)}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                  >
                                    <Copy className="w-4 h-4" />
                                    Дублировать
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBroadcast(broadcast.id)}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Удалить
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}

        {tab === 'templates' && (
          <div className="p-6">
            {templates.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Нет шаблонов</h3>
                <p className="text-gray-500">Создайте шаблоны для быстрой рассылки</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300">
                    <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">{template.message}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Использовать
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="px-3 py-1 border border-gray-200 text-sm rounded hover:bg-gray-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {tab === 'broadcasts' && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Страница {page} из {totalPages}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Назад</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Вперёд</button>
          </div>
        </div>
      )}

      {/* Create Broadcast Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold mb-4">Новая рассылка</h3>
            
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium mb-1">Название (для себя)</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Новогодняя акция"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Формат</label>
                <select
                  value={formData.parse_mode}
                  onChange={(e) => setFormData({ ...formData, parse_mode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="HTML">HTML</option>
                  <option value="Markdown">Markdown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Сообщение *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  placeholder={formData.parse_mode === 'HTML' ? '<b>Привет!</b>\n\nТекст сообщения' : '**Привет!**\n\nТекст сообщения'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Аудитория</label>
                <select
                  value={formData.target_type}
                  onChange={(e) => setFormData({ ...formData, target_type: e.target.value, target_tags: [] })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="all">Все пользователи</option>
                  <option value="tags">По тегам</option>
                </select>
              </div>

              {formData.target_type === 'tags' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Теги</label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const newTags = formData.target_tags.includes(tag)
                            ? formData.target_tags.filter(t => t !== tag)
                            : [...formData.target_tags, tag];
                          setFormData({ ...formData, target_tags: newTags });
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.target_tags.includes(tag)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  <Users className="w-4 h-4 inline mr-1" />
                  Получателей: <strong>{recipientCount}</strong>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={() => handleCreateBroadcast(false)}
                  disabled={actionLoading === 'create'}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Сохранить черновик
                </button>
                <button
                  onClick={() => handleCreateBroadcast(true)}
                  disabled={actionLoading === 'create' || recipientCount === 0}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {actionLoading === 'create' ? 'Отправка...' : 'Отправить сейчас'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold mb-4">Новый шаблон</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Название *</label>
                <input
                  type="text"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Приветственное сообщение"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Формат</label>
                <select
                  value={templateForm.parse_mode}
                  onChange={(e) => setTemplateForm({ ...templateForm, parse_mode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="HTML">HTML</option>
                  <option value="Markdown">Markdown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Текст *</label>
                <textarea
                  value={templateForm.message}
                  onChange={(e) => setTemplateForm({ ...templateForm, message: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowTemplateModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Отмена</button>
                <button
                  onClick={handleSaveTemplate}
                  disabled={actionLoading === 'template'}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading === 'template' ? 'Сохранение...' : 'Сохранить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold mb-4">Просмотр рассылки</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div dangerouslySetInnerHTML={{ __html: showPreviewModal.message.replace(/\n/g, '<br>') }} />
            </div>
            <button onClick={() => setShowPreviewModal(null)} className="w-full px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

```

# app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-50 text-gray-900;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

```

# app/layout.tsx

```tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'MerchantAI Admin',
  description: 'Admin dashboard for MerchantAI Telegram Bot',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

```

# app/outreach/accounts/page.tsx

```tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  Plus, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  AlertTriangle,
  Clock,
  RefreshCw,
  Trash2,
  MoreVertical,
  Check,
  Key,
  ArrowUp,
  ArrowDown,
  ArrowUpDown
} from 'lucide-react';

interface Account {
  id: string;
  phone: string;
  name: string | null;
  api_id: string;
  status: string;
  daily_messages_sent: number;
  daily_limit: number;
  total_messages_sent: number;
  total_replies: number;
  telegram_username: string | null;
  created_at: string;
}

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  connected: { label: 'Подключён', icon: Wifi, color: 'text-green-600 bg-green-100' },
  disconnected: { label: 'Отключён', icon: WifiOff, color: 'text-gray-600 bg-gray-100' },
  pending_verification: { label: 'Ожидает код', icon: Clock, color: 'text-yellow-600 bg-yellow-100' },
  awaiting_code: { label: 'Введите код', icon: Key, color: 'text-blue-600 bg-blue-100' },
  awaiting_2fa: { label: 'Введите 2FA', icon: Key, color: 'text-purple-600 bg-purple-100' },
  banned: { label: 'Забанен', icon: AlertTriangle, color: 'text-red-600 bg-red-100' },
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // Filters
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState<Account | null>(null);
  const [showMenuId, setShowMenuId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    phone: '',
    api_id: '',
    api_hash: '',
    name: '',
    daily_limit: '40',
  });
  const [verifyCode, setVerifyCode] = useState('');
  const [twoFactorPassword, setTwoFactorPassword] = useState('');

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    params.set('sort', sort);
    params.set('order', order);
    params.set('page', String(page));

    try {
      const res = await fetch(`/api/outreach/accounts/list?${params.toString()}`);
      const data = await res.json();
      setAccounts(data.accounts || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch accounts:', err);
    }
    setLoading(false);
  }, [status, sort, order, page]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setSort(field);
      setOrder('desc');
    }
  };

  const handleAddAccount = async () => {
    if (!formData.phone || !formData.api_id || !formData.api_hash) {
      toast.error('Заполните обязательные поля');
      return;
    }

    setActionLoading('add');
    try {
      const res = await fetch('/api/outreach/accounts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone,
          api_id: formData.api_id,
          api_hash: formData.api_hash,
          name: formData.name || null,
          daily_limit: parseInt(formData.daily_limit) || 40,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Аккаунт добавлен');
        setShowAddModal(false);
        setFormData({ phone: '', api_id: '', api_hash: '', name: '', daily_limit: '40' });
        fetchAccounts();
        // Auto-open verification
        setShowVerifyModal(data.account);
        handleSendCode(data.account.id);
      } else {
        toast.error(data.error || 'Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSendCode = async (accountId: string) => {
    setActionLoading(accountId);
    try {
      const res = await fetch('/api/outreach/accounts/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Код отправлен на телефон');
        fetchAccounts();
      } else {
        toast.error(data.error || 'Ошибка отправки кода');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleVerifyCode = async () => {
    if (!showVerifyModal || !verifyCode) return;

    setActionLoading('verify');
    try {
      const res = await fetch('/api/outreach/accounts/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: showVerifyModal.id,
          code: verifyCode,
          password: twoFactorPassword || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Аккаунт подключён!');
        setShowVerifyModal(null);
        setVerifyCode('');
        setTwoFactorPassword('');
        fetchAccounts();
      } else if (data.error === '2FA_REQUIRED') {
        toast.error('Требуется пароль двухфакторной аутентификации');
        fetchAccounts();
      } else {
        toast.error(data.error || 'Неверный код');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCheckConnection = async (accountId: string) => {
    setActionLoading(accountId);
    try {
      const res = await fetch('/api/outreach/accounts/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      });

      const data = await res.json();
      if (data.connected) {
        toast.success('Аккаунт активен');
      } else {
        toast.error('Аккаунт отключён');
      }
      fetchAccounts();
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
      setShowMenuId(null);
    }
  };

  const handleDelete = async (accountId: string) => {
    if (!confirm('Удалить аккаунт?')) return;

    setActionLoading(accountId);
    try {
      const res = await fetch('/api/outreach/accounts/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      });

      if (res.ok) {
        toast.success('Аккаунт удалён');
        fetchAccounts();
      } else {
        toast.error('Ошибка удаления');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
      setShowMenuId(null);
    }
  };

  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button onClick={() => handleSort(field)} className="flex items-center gap-1 hover:text-gray-900">
      {children}
      {sort === field ? (
        order === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-30" />
      )}
    </button>
  );

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Telegram аккаунты</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Добавить аккаунт
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Все статусы</option>
            {Object.entries(statusConfig).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : accounts.length === 0 ? (
          <div className="p-12 text-center">
            <Smartphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Нет аккаунтов</h3>
            <p className="text-gray-500 mb-4">Добавьте Telegram аккаунты для аутрича</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Аккаунт</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="daily_messages_sent">Сегодня</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="total_messages_sent">Всего</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="total_replies">Ответов</SortButton>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {accounts.map((account) => {
                const statusInfo = statusConfig[account.status] || statusConfig.disconnected;
                const StatusIcon = statusInfo.icon;
                const needsVerification = ['pending_verification', 'awaiting_code', 'awaiting_2fa'].includes(account.status);

                return (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{account.name || account.phone}</p>
                          <p className="text-sm text-gray-500">
                            {account.telegram_username ? `@${account.telegram_username}` : account.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${statusInfo.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{account.daily_messages_sent} / {account.daily_limit}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{account.total_messages_sent}</td>
                    <td className="px-6 py-4 text-gray-600">{account.total_replies}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {needsVerification && (
                          <button
                            onClick={() => {
                              setShowVerifyModal(account);
                              if (account.status === 'pending_verification') {
                                handleSendCode(account.id);
                              }
                            }}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            Верифицировать
                          </button>
                        )}
                        
                        <div className="relative">
                          <button
                            onClick={() => setShowMenuId(showMenuId === account.id ? null : account.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            disabled={actionLoading === account.id}
                          >
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                          </button>

                          {showMenuId === account.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setShowMenuId(null)} />
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                {account.status === 'connected' && (
                                  <button
                                    onClick={() => handleCheckConnection(account.id)}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                  >
                                    <RefreshCw className="w-4 h-4" />
                                    Проверить связь
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDelete(account.id)}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Удалить
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Страница {page} из {totalPages}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Назад
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Вперёд
            </button>
          </div>
        </div>
      )}

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Добавить аккаунт</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Название</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Рабочий аккаунт 1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Телефон *</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="+79001234567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">API ID *</label>
                <input
                  type="text"
                  value={formData.api_id}
                  onChange={(e) => setFormData({ ...formData, api_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="12345678"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">API Hash *</label>
                <input
                  type="text"
                  value={formData.api_hash}
                  onChange={(e) => setFormData({ ...formData, api_hash: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  placeholder="a1b2c3d4e5f6..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Дневной лимит</label>
                <input
                  type="number"
                  value={formData.daily_limit}
                  onChange={(e) => setFormData({ ...formData, daily_limit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                <p className="font-medium mb-1">Как получить API ID и Hash?</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Перейдите на <a href="https://my.telegram.org" target="_blank" className="underline">my.telegram.org</a></li>
                  <li>Войдите с номером телефона</li>
                  <li>Выберите "API development tools"</li>
                  <li>Создайте приложение</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleAddAccount}
                  disabled={actionLoading === 'add'}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading === 'add' ? 'Добавление...' : 'Добавить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verify Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Верификация аккаунта</h3>
            
            <p className="text-gray-600 mb-4">
              {showVerifyModal.status === 'awaiting_2fa'
                ? 'Введите пароль двухфакторной аутентификации'
                : `Код отправлен на ${showVerifyModal.phone}`
              }
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {showVerifyModal.status === 'awaiting_2fa' ? '2FA пароль' : 'Код из Telegram'}
                </label>
                {showVerifyModal.status === 'awaiting_2fa' ? (
                  <input
                    type="password"
                    value={twoFactorPassword}
                    onChange={(e) => setTwoFactorPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center text-2xl tracking-widest"
                    placeholder="••••••"
                  />
                ) : (
                  <input
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center text-2xl tracking-widest"
                    placeholder="12345"
                    maxLength={5}
                  />
                )}
              </div>

              {showVerifyModal.status === 'awaiting_2fa' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Код из сообщения (если ещё нужен)</label>
                  <input
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center tracking-widest"
                    placeholder="12345"
                    maxLength={5}
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowVerifyModal(null);
                    setVerifyCode('');
                    setTwoFactorPassword('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleVerifyCode}
                  disabled={actionLoading === 'verify' || (!verifyCode && !twoFactorPassword)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading === 'verify' ? 'Проверка...' : 'Подтвердить'}
                </button>
              </div>

              {showVerifyModal.status !== 'awaiting_2fa' && (
                <button
                  onClick={() => handleSendCode(showVerifyModal.id)}
                  disabled={actionLoading === showVerifyModal.id}
                  className="w-full text-sm text-blue-600 hover:underline"
                >
                  Отправить код повторно
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```

# app/outreach/campaigns/page.tsx

```tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  Plus,
  Megaphone,
  Play,
  Pause,
  MoreVertical,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  MessageSquare,
  Users,
  CheckCircle,
  X
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  group_message: string;
  status: string;
  messages_sent: number;
  replies_received: number;
  conversations_started: number;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  draft: { label: 'Черновик', color: 'bg-gray-100 text-gray-700' },
  active: { label: 'Активна', color: 'bg-green-100 text-green-700' },
  paused: { label: 'Приостановлена', color: 'bg-yellow-100 text-yellow-700' },
  completed: { label: 'Завершена', color: 'bg-blue-100 text-blue-700' },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  });
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMenuId, setShowMenuId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Form
  const [formData, setFormData] = useState({
    name: '',
    group_message: '',
    target_categories: [] as string[],
    dm_template: '',
    delay_between_messages: '300',
  });
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    params.set('sort', sort);
    params.set('order', order);
    params.set('page', String(page));

    try {
      const res = await fetch(`/api/outreach/campaigns/list?${params.toString()}`);
      const data = await res.json();
      setCampaigns(data.campaigns || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    }
    setLoading(false);
  }, [status, sort, order, page]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/outreach/groups/list');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchCategories();
  }, [fetchCampaigns]);

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setSort(field);
      setOrder('desc');
    }
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.group_message) {
      toast.error('Заполните название и сообщение');
      return;
    }

    setActionLoading('create');
    try {
      const res = await fetch('/api/outreach/campaigns/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          group_message: formData.group_message,
          target_categories: formData.target_categories,
          dm_templates: formData.dm_template ? [{ text: formData.dm_template }] : [],
          delay_between_messages: parseInt(formData.delay_between_messages) || 300,
        }),
      });

      if (res.ok) {
        toast.success('Кампания создана');
        setShowCreateModal(false);
        setFormData({ name: '', group_message: '', target_categories: [], dm_template: '', delay_between_messages: '300' });
        fetchCampaigns();
      } else {
        toast.error('Ошибка создания');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateStatus = async (campaignId: string, newStatus: string) => {
    setActionLoading(campaignId);
    try {
      const res = await fetch('/api/outreach/campaigns/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId, status: newStatus }),
      });

      if (res.ok) {
        toast.success('Статус обновлён');
        fetchCampaigns();
      } else {
        toast.error('Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
      setShowMenuId(null);
    }
  };

  const handleDelete = async (campaignId: string) => {
    if (!confirm('Удалить кампанию?')) return;

    setActionLoading(campaignId);
    try {
      const res = await fetch('/api/outreach/campaigns/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId }),
      });

      if (res.ok) {
        toast.success('Кампания удалена');
        fetchCampaigns();
      } else {
        toast.error('Ошибка удаления');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
      setShowMenuId(null);
    }
  };

  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button onClick={() => handleSort(field)} className="flex items-center gap-1 hover:text-gray-900">
      {children}
      {sort === field ? (
        order === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-30" />
      )}
    </button>
  );

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Кампании</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Новая кампания
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Все статусы</option>
            {Object.entries(statusConfig).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="p-12 text-center">
            <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Нет кампаний</h3>
            <p className="text-gray-500">Создайте первую кампанию для аутрича</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Кампания</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="messages_sent">Сообщений</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="replies_received">Ответов</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="conversations_started">Конверсий</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="created_at">Создана</SortButton>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((campaign) => {
                const statusInfo = statusConfig[campaign.status] || statusConfig.draft;

                return (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{campaign.group_message.substring(0, 50)}...</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MessageSquare className="w-4 h-4" />
                        {campaign.messages_sent}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        {campaign.replies_received}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        {campaign.conversations_started}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(campaign.created_at)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setShowMenuId(showMenuId === campaign.id ? null : campaign.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>

                        {showMenuId === campaign.id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowMenuId(null)} />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                              {campaign.status === 'active' ? (
                                <button
                                  onClick={() => handleUpdateStatus(campaign.id, 'paused')}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Pause className="w-4 h-4" />
                                  Приостановить
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUpdateStatus(campaign.id, 'active')}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Play className="w-4 h-4" />
                                  Запустить
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(campaign.id)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                Удалить
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Страница {page} из {totalPages}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Назад</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Вперёд</button>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Новая кампания</h3>
              <button onClick={() => setShowCreateModal(false)}><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium mb-1">Название *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Новогодняя кампания"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Сообщение для групп *</label>
                <textarea
                  value={formData.group_message}
                  onChange={(e) => setFormData({ ...formData, group_message: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Привет! Делаю карточки для маркетплейсов с AI..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Категории групп</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        const newCats = formData.target_categories.includes(cat)
                          ? formData.target_categories.filter(c => c !== cat)
                          : [...formData.target_categories, cat];
                        setFormData({ ...formData, target_categories: newCats });
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        formData.target_categories.includes(cat)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  {categories.length === 0 && (
                    <p className="text-sm text-gray-500">Нет категорий. Добавьте группы с категориями.</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Шаблон DM для ответивших</label>
                <textarea
                  value={formData.dm_template}
                  onChange={(e) => setFormData({ ...formData, dm_template: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Привет! Спасибо что откликнулись..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Задержка между сообщениями (сек)</label>
                <input
                  type="number"
                  value={formData.delay_between_messages}
                  onChange={(e) => setFormData({ ...formData, delay_between_messages: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Отмена</button>
                <button
                  onClick={handleCreate}
                  disabled={actionLoading === 'create'}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading === 'create' ? 'Создание...' : 'Создать'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```

# app/outreach/groups/page.tsx

```tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  Plus,
  Users,
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ExternalLink,
  MoreVertical,
  Trash2,
  Pause,
  Play,
  Upload,
  X
} from 'lucide-react';

interface Group {
  id: string;
  telegram_id: number | null;
  username: string | null;
  title: string;
  member_count: number | null;
  category: string | null;
  status: string;
  posts_count: number;
  last_post_at: string | null;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: 'Активна', color: 'bg-green-100 text-green-700' },
  paused: { label: 'Приостановлена', color: 'bg-yellow-100 text-yellow-700' },
  banned: { label: 'Забанена', color: 'bg-red-100 text-red-700' },
};

function formatDate(dateString: string | null) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  });
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  
  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showMenuId, setShowMenuId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    category: '',
    member_count: '',
  });
  const [bulkData, setBulkData] = useState('');

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    if (category) params.set('category', category);
    params.set('sort', sort);
    params.set('order', order);
    params.set('page', String(page));

    try {
      const res = await fetch(`/api/outreach/groups/list?${params.toString()}`);
      const data = await res.json();
      setGroups(data.groups || []);
      setTotal(data.total || 0);
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Failed to fetch groups:', err);
    }
    setLoading(false);
  }, [search, status, category, sort, order, page]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setSort(field);
      setOrder('desc');
    }
  };

  const handleAddGroup = async () => {
    if (!formData.title) {
      toast.error('Введите название группы');
      return;
    }

    setActionLoading('add');
    try {
      const res = await fetch('/api/outreach/groups/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          username: formData.username || null,
          category: formData.category || null,
          member_count: formData.member_count ? parseInt(formData.member_count) : null,
        }),
      });

      if (res.ok) {
        toast.success('Группа добавлена');
        setShowAddModal(false);
        setFormData({ title: '', username: '', category: '', member_count: '' });
        fetchGroups();
      } else {
        toast.error('Ошибка добавления');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleBulkImport = async () => {
    if (!bulkData.trim()) {
      toast.error('Введите данные');
      return;
    }

    setActionLoading('bulk');
    try {
      const lines = bulkData.trim().split('\n');
      const groups = lines.map(line => {
        const parts = line.split('|').map(p => p.trim());
        return {
          title: parts[0] || 'Без названия',
          username: parts[1] || null,
          category: parts[2] || null,
          member_count: parts[3] ? parseInt(parts[3]) : null,
        };
      });

      const res = await fetch('/api/outreach/groups/bulk-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groups }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Добавлено ${data.count} групп`);
        setShowBulkModal(false);
        setBulkData('');
        fetchGroups();
      } else {
        toast.error(data.error || 'Ошибка импорта');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateStatus = async (groupId: string, newStatus: string) => {
    setActionLoading(groupId);
    try {
      const res = await fetch('/api/outreach/groups/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId, status: newStatus }),
      });

      if (res.ok) {
        toast.success('Статус обновлён');
        fetchGroups();
      } else {
        toast.error('Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
      setShowMenuId(null);
    }
  };

  const handleDelete = async (groupId: string) => {
    if (!confirm('Удалить группу?')) return;

    setActionLoading(groupId);
    try {
      const res = await fetch('/api/outreach/groups/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId }),
      });

      if (res.ok) {
        toast.success('Группа удалена');
        fetchGroups();
      } else {
        toast.error('Ошибка удаления');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
      setShowMenuId(null);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('');
    setCategory('');
    setPage(1);
  };

  const hasFilters = search || status || category;
  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button onClick={() => handleSort(field)} className="flex items-center gap-1 hover:text-gray-900">
      {children}
      {sort === field ? (
        order === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-30" />
      )}
    </button>
  );

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Группы для аутрича</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBulkModal(true)}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Импорт
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Добавить
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Поиск по названию"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Все статусы</option>
            {Object.entries(statusConfig).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Все категории</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Сбросить
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : groups.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Нет групп</h3>
            <p className="text-gray-500">Добавьте группы для аутрича</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Группа</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Категория</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="member_count">Участников</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="posts_count">Постов</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="created_at">Добавлена</SortButton>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {groups.map((group) => {
                const statusInfo = statusConfig[group.status] || statusConfig.active;

                return (
                  <tr key={group.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{group.title}</p>
                        {group.username && (
                          <a
                            href={`https://t.me/${group.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                          >
                            @{group.username}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{group.category || '—'}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {group.member_count?.toLocaleString() || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{group.posts_count || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(group.created_at)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setShowMenuId(showMenuId === group.id ? null : group.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          disabled={actionLoading === group.id}
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>

                        {showMenuId === group.id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowMenuId(null)} />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                              {group.status === 'active' ? (
                                <button
                                  onClick={() => handleUpdateStatus(group.id, 'paused')}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Pause className="w-4 h-4" />
                                  Приостановить
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUpdateStatus(group.id, 'active')}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Play className="w-4 h-4" />
                                  Активировать
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(group.id)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                Удалить
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Страница {page} из {totalPages}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Назад</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Вперёд</button>
          </div>
        </div>
      )}

      {/* Add Group Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Добавить группу</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Название *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="WB Дизайнеры"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Username (без @)</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="wb_designers"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Категория</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="wb, freelancers"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Участников</label>
                <input
                  type="number"
                  value={formData.member_count}
                  onChange={(e) => setFormData({ ...formData, member_count: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="5000"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Отмена</button>
                <button
                  onClick={handleAddGroup}
                  disabled={actionLoading === 'add'}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading === 'add' ? 'Добавление...' : 'Добавить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold mb-4">Массовый импорт</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Данные для импорта</label>
                <p className="text-xs text-gray-500 mb-2">Формат: название|username|категория|участников</p>
                <textarea
                  value={bulkData}
                  onChange={(e) => setBulkData(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  placeholder={`WB Дизайнеры|wb_designers|wb|5000\nФриланс Биржа|freelance_birja|freelancers|12000`}
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowBulkModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Отмена</button>
                <button
                  onClick={handleBulkImport}
                  disabled={actionLoading === 'bulk'}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading === 'bulk' ? 'Импорт...' : 'Импортировать'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```

# app/outreach/leads/LeadActions.tsx

```tsx
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { MoreVertical, Send, Check, X, MessageSquare, UserCheck } from 'lucide-react';

interface Lead {
  id: string;
  telegram_id: number;
  username: string | null;
  status: string;
  dm_sent: boolean;
}

interface LeadActionsProps {
  lead: Lead;
  onUpdate?: () => void;
}

export default function LeadActions({ lead, onUpdate }: LeadActionsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/outreach/leads/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, status: newStatus }),
      });

      if (res.ok) {
        toast.success('Статус обновлён');
        onUpdate?.();
      } else {
        toast.error('Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setLoading(false);
      setShowMenu(false);
    }
  };

  const handleSendDM = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/outreach/leads/send-dm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id }),
      });

      if (res.ok) {
        toast.success('DM отправлен');
        onUpdate?.();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setLoading(false);
      setShowMenu(false);
    }
  };

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 hover:bg-gray-100 rounded-lg"
        disabled={loading}
      >
        <MoreVertical className="w-5 h-5 text-gray-500" />
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="fixed right-4 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            {lead.username && (
              <a
                href={`https://t.me/${lead.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 block"
              >
                <MessageSquare className="w-4 h-4" />
                Открыть в Telegram
              </a>
            )}
            
            {!lead.dm_sent && (
              <button
                onClick={handleSendDM}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Отправить DM
              </button>
            )}

            <hr className="my-1" />

            <p className="px-4 py-1 text-xs text-gray-400 uppercase">Изменить статус</p>

            <button
              onClick={() => handleUpdateStatus('contacted')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-yellow-500" />
              Связались
            </button>
            
            <button
              onClick={() => handleUpdateStatus('replied')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-green-500" />
              Ответил
            </button>
            
            <button
              onClick={() => handleUpdateStatus('qualified')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-purple-500" />
              Квалифицирован
            </button>
            
            <button
              onClick={() => handleUpdateStatus('converted')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-500" />
              Конвертирован
            </button>
            
            <button
              onClick={() => handleUpdateStatus('rejected')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
            >
              <X className="w-4 h-4" />
              Отклонить
            </button>
          </div>
        </>
      )}
    </div>
  );
}

```

# app/outreach/leads/page.tsx

```tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  UserPlus, 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  ExternalLink,
  Check,
  X
} from 'lucide-react';
import LeadActions from './LeadActions';

interface Lead {
  id: string;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  initial_message: string | null;
  status: string;
  dm_sent: boolean;
  created_at: string;
  campaign_name?: string;
  group_title?: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: 'Новый', color: 'bg-blue-100 text-blue-700' },
  contacted: { label: 'Связались', color: 'bg-yellow-100 text-yellow-700' },
  replied: { label: 'Ответил', color: 'bg-green-100 text-green-700' },
  qualified: { label: 'Квалифицирован', color: 'bg-purple-100 text-purple-700' },
  converted: { label: 'Конвертирован', color: 'bg-emerald-100 text-emerald-700' },
  rejected: { label: 'Отклонён', color: 'bg-red-100 text-red-700' },
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function LeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([]);
  
  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [campaign, setCampaign] = useState(searchParams.get('campaign') || '');
  const [dmSent, setDmSent] = useState(searchParams.get('dm') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>((searchParams.get('order') as 'asc' | 'desc') || 'desc');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    if (campaign) params.set('campaign', campaign);
    if (dmSent) params.set('dm', dmSent);
    params.set('sort', sort);
    params.set('order', order);
    params.set('page', String(page));

    try {
      const res = await fetch(`/api/outreach/leads/list?${params.toString()}`);
      const data = await res.json();
      setLeads(data.leads || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    }
    setLoading(false);
  }, [search, status, campaign, dmSent, sort, order, page]);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/outreach/campaigns/list');
      const data = await res.json();
      setCampaigns(data.campaigns || []);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setSort(field);
      setOrder('desc');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('');
    setCampaign('');
    setDmSent('');
    setPage(1);
  };

  const hasFilters = search || status || campaign || dmSent;
  const totalPages = Math.ceil(total / 20);

  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-gray-900"
    >
      {children}
      {sort === field ? (
        order === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-30" />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Лиды</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Поиск по имени или username"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Status filter */}
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Все статусы</option>
            {Object.entries(statusConfig).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>

          {/* Campaign filter */}
          <select
            value={campaign}
            onChange={(e) => { setCampaign(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Все кампании</option>
            {campaigns.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* DM sent filter */}
          <select
            value={dmSent}
            onChange={(e) => { setDmSent(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">DM: все</option>
            <option value="true">DM отправлен</option>
            <option value="false">DM не отправлен</option>
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Сбросить
            </button>
          )}
        </div>

        {/* Status quick filters */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => { setStatus(''); setPage(1); }}
            className={`px-3 py-1 rounded-full text-sm ${
              !status ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Все
          </button>
          {Object.entries(statusConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => { setStatus(key); setPage(1); }}
              className={`px-3 py-1 rounded-full text-sm ${
                status === key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-500">Загрузка...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Лиды не найдены
            </h3>
            <p className="text-gray-500">
              {hasFilters ? 'Попробуйте изменить параметры поиска' : 'Лиды появятся когда люди начнут отвечать на объявления'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Лид
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortButton field="status">Статус</SortButton>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Кампания
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    DM
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Сообщение
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortButton field="created_at">Дата</SortButton>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => {
                  const statusInfo = statusConfig[lead.status] || statusConfig.new;
                  
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-600 font-medium">
                              {(lead.first_name || lead.username || '?')[0].toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {lead.first_name || 'Без имени'}
                              {lead.last_name && ` ${lead.last_name}`}
                            </p>
                            {lead.username && (
                              <a
                                href={`https://t.me/${lead.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                              >
                                @{lead.username}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {lead.campaign_name || '—'}
                      </td>
                      <td className="px-6 py-4">
                        {lead.dm_sent ? (
                          <span className="flex items-center gap-1 text-green-600 text-sm">
                            <Check className="w-4 h-4" />
                            Да
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">Нет</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {lead.initial_message && (
                          <p className="text-sm text-gray-600 max-w-xs truncate" title={lead.initial_message}>
                            {lead.initial_message}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <LeadActions lead={lead} onUpdate={fetchLeads} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Показано {(page - 1) * 20 + 1}–{Math.min(page * 20, total)} из {total}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Назад
            </button>
            <span className="px-4 py-2 text-gray-600">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Вперёд
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

```

# app/outreach/page.tsx

```tsx
import { supabaseAdmin } from '@/lib/supabase';
import { formatNumber } from '@/lib/utils';
import Link from 'next/link';
import {
  Target,
  Users,
  MessageSquare,
  UserPlus,
  Plus,
  PlayCircle,
  PauseCircle,
} from 'lucide-react';

async function getOutreachStats() {
  const { count: totalAccounts } = await supabaseAdmin
    .from('outreach_accounts')
    .select('*', { count: 'exact', head: true });

  const { count: connectedAccounts } = await supabaseAdmin
    .from('outreach_accounts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'connected');

  const { count: totalGroups } = await supabaseAdmin
    .from('outreach_groups')
    .select('*', { count: 'exact', head: true });

  const { count: activeCampaigns } = await supabaseAdmin
    .from('outreach_campaigns')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: totalLeads } = await supabaseAdmin
    .from('outreach_leads')
    .select('*', { count: 'exact', head: true });

  const { count: newLeads } = await supabaseAdmin
    .from('outreach_leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');

  return {
    totalAccounts: totalAccounts || 0,
    connectedAccounts: connectedAccounts || 0,
    totalGroups: totalGroups || 0,
    activeCampaigns: activeCampaigns || 0,
    totalLeads: totalLeads || 0,
    newLeads: newLeads || 0,
  };
}

async function getActiveCampaigns() {
  const { data } = await supabaseAdmin
    .from('outreach_campaigns')
    .select('*')
    .in('status', ['active', 'paused'])
    .order('created_at', { ascending: false })
    .limit(5);

  return data || [];
}

export default async function OutreachPage() {
  const stats = await getOutreachStats();
  const campaigns = await getActiveCampaigns();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Аутрич</h1>
          <p className="text-gray-500">Автоматизация привлечения клиентов</p>
        </div>

        <Link
          href="/outreach/campaigns/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Новая кампания
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link
          href="/outreach/accounts"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 transition-colors"
        >
          <Users className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-2xl font-bold">{stats.connectedAccounts}/{stats.totalAccounts}</p>
          <p className="text-sm text-gray-500">Аккаунтов</p>
        </Link>

        <Link
          href="/outreach/groups"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 transition-colors"
        >
          <MessageSquare className="w-6 h-6 text-purple-600 mb-2" />
          <p className="text-2xl font-bold">{formatNumber(stats.totalGroups)}</p>
          <p className="text-sm text-gray-500">Групп</p>
        </Link>

        <Link
          href="/outreach/campaigns"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 transition-colors"
        >
          <Target className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-2xl font-bold">{stats.activeCampaigns}</p>
          <p className="text-sm text-gray-500">Активных кампаний</p>
        </Link>

        <Link
          href="/outreach/leads"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 transition-colors"
        >
          <UserPlus className="w-6 h-6 text-orange-600 mb-2" />
          <p className="text-2xl font-bold">{formatNumber(stats.totalLeads)}</p>
          <p className="text-sm text-gray-500">Всего лидов</p>
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <UserPlus className="w-6 h-6 text-cyan-600 mb-2" />
          <p className="text-2xl font-bold">{stats.newLeads}</p>
          <p className="text-sm text-gray-500">Новых лидов</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/outreach/accounts"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-2">Telegram аккаунты</h3>
          <p className="text-sm text-gray-500">
            Управление аккаунтами для аутрича
          </p>
        </Link>

        <Link
          href="/outreach/groups"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-2">Группы</h3>
          <p className="text-sm text-gray-500">
            База групп для размещения объявлений
          </p>
        </Link>

        <Link
          href="/outreach/campaigns"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-2">Кампании</h3>
          <p className="text-sm text-gray-500">
            Настройка и запуск кампаний
          </p>
        </Link>

        <Link
          href="/outreach/leads"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-2">Лиды</h3>
          <p className="text-sm text-gray-500">
            Люди, откликнувшиеся на объявления
          </p>
        </Link>
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Активные кампании
          </h2>
          <Link
            href="/outreach/campaigns"
            className="text-blue-600 text-sm hover:underline"
          >
            Все кампании →
          </Link>
        </div>

        {campaigns.length === 0 ? (
          <div className="p-12 text-center">
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Нет активных кампаний
            </h3>
            <p className="text-gray-500 mb-4">
              Создайте первую кампанию для привлечения клиентов
            </p>
            <Link
              href="/outreach/campaigns/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Создать кампанию
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {campaigns.map((campaign: any) => (
              <div key={campaign.id} className="p-4 flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  campaign.status === 'active' 
                    ? 'bg-green-100' 
                    : 'bg-yellow-100'
                }`}>
                  {campaign.status === 'active' 
                    ? <PlayCircle className="w-5 h-5 text-green-600" />
                    : <PauseCircle className="w-5 h-5 text-yellow-600" />
                  }
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-sm text-gray-500">
                    Отправлено: {campaign.messages_sent} · 
                    Ответов: {campaign.replies_received} · 
                    Конверсий: {campaign.conversations_started}
                  </p>
                </div>
                <Link
                  href={`/outreach/campaigns/${campaign.id}`}
                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                >
                  Подробнее
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

```

# app/page.tsx

```tsx
import { supabaseAdmin } from '@/lib/supabase';
import { formatCurrency, formatNumber } from '@/lib/utils';
import {
  Users,
  CreditCard,
  Image,
  TrendingUp,
  UserPlus,
  Target,
} from 'lucide-react';

async function getStats() {
  const today = new Date().toISOString().split('T')[0];
  
  // Total users
  const { count: totalUsers } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true });

  // Today's new users
  const { count: todayUsers } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today);

  // Total revenue
  const { data: revenueData } = await supabaseAdmin
    .from('payments')
    .select('amount')
    .eq('status', 'succeeded');
  
  const totalRevenue = revenueData?.reduce((sum, p) => sum + p.amount, 0) || 0;

  // Today's revenue
  const { data: todayRevenueData } = await supabaseAdmin
    .from('payments')
    .select('amount')
    .eq('status', 'succeeded')
    .gte('created_at', today);
  
  const todayRevenue = todayRevenueData?.reduce((sum, p) => sum + p.amount, 0) || 0;

  // Total cards generated
  const { data: cardsData } = await supabaseAdmin
    .from('users')
    .select('cards_created');
  
  const totalCards = cardsData?.reduce((sum, u) => sum + u.cards_created, 0) || 0;

  // Referral signups
  const { count: referralSignups } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true })
    .not('referred_by', 'is', null);

  // Active outreach campaigns
  const { count: activeCampaigns } = await supabaseAdmin
    .from('outreach_campaigns')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  // New leads today
  const { count: newLeads } = await supabaseAdmin
    .from('outreach_leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today);

  return {
    totalUsers: totalUsers || 0,
    todayUsers: todayUsers || 0,
    totalRevenue,
    todayRevenue,
    totalCards,
    referralSignups: referralSignups || 0,
    activeCampaigns: activeCampaigns || 0,
    newLeads: newLeads || 0,
  };
}

async function getRecentUsers() {
  const { data } = await supabaseAdmin
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  return data || [];
}

async function getRecentPayments() {
  const { data } = await supabaseAdmin
    .from('payments')
    .select('*, users(username, first_name)')
    .eq('status', 'succeeded')
    .order('created_at', { ascending: false })
    .limit(5);
  
  return data || [];
}

export default async function DashboardPage() {
  const stats = await getStats();
  const recentUsers = await getRecentUsers();
  const recentPayments = await getRecentPayments();

  const statCards = [
    {
      title: 'Пользователей',
      value: formatNumber(stats.totalUsers),
      subtitle: `+${stats.todayUsers} сегодня`,
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Выручка',
      value: formatCurrency(stats.totalRevenue),
      subtitle: `+${formatCurrency(stats.todayRevenue)} сегодня`,
      icon: CreditCard,
      color: 'text-green-600 bg-green-50',
    },
    {
      title: 'Карточек создано',
      value: formatNumber(stats.totalCards),
      subtitle: 'всего генераций',
      icon: Image,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'По рефералам',
      value: formatNumber(stats.referralSignups),
      subtitle: 'регистраций',
      icon: UserPlus,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      title: 'Аутрич кампании',
      value: formatNumber(stats.activeCampaigns),
      subtitle: 'активных',
      icon: Target,
      color: 'text-pink-600 bg-pink-50',
    },
    {
      title: 'Новых лидов',
      value: formatNumber(stats.newLeads),
      subtitle: 'сегодня',
      icon: TrendingUp,
      color: 'text-cyan-600 bg-cyan-50',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
        <p className="text-gray-500">Обзор ключевых метрик</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Новые пользователи
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentUsers.map((user: any) => (
              <div key={user.id} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {(user.first_name || user.username || '?')[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {user.first_name || user.username || 'Без имени'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.username ? `@${user.username}` : `ID: ${user.telegram_id}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.credits} токенов
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.utm_source && `via ${user.utm_source}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Последние платежи
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentPayments.map((payment: any) => (
              <div key={payment.id} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {payment.users?.first_name || payment.users?.username || 'Пользователь'}
                  </p>
                  <p className="text-sm text-gray-500">{payment.plan}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    +{formatCurrency(payment.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

```

# app/users/page.tsx

```tsx
import { supabaseAdmin } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Users, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import UserActions from './UserActions';

interface SearchParams {
  search?: string;
  tag?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: string;
  blocked?: string;
}

async function getUsers(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;
  const sortField = searchParams.sort || 'created_at';
  const sortOrder = searchParams.order || 'desc';

  let query = supabaseAdmin
    .from('users')
    .select('*', { count: 'exact' });

  // Search filter
  if (searchParams.search) {
    const search = searchParams.search;
    query = query.or(`username.ilike.%${search}%,first_name.ilike.%${search}%,telegram_id.eq.${parseInt(search) || 0}`);
  }

  // Tag filter
  if (searchParams.tag) {
    query = query.contains('tags', [searchParams.tag]);
  }

  // Blocked filter
  if (searchParams.blocked === 'true') {
    query = query.eq('is_blocked', true);
  } else if (searchParams.blocked === 'false') {
    query = query.eq('is_blocked', false);
  }

  // Sorting
  query = query.order(sortField, { ascending: sortOrder === 'asc' });

  const { data, count } = await query.range(offset, offset + limit - 1);

  return {
    users: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

async function getAllTags() {
  const { data } = await supabaseAdmin
    .from('users')
    .select('tags');

  const tagSet = new Set<string>();
  data?.forEach(user => {
    user.tags?.forEach((tag: string) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

function SortLink({ 
  field, 
  currentSort, 
  currentOrder, 
  searchParams, 
  children 
}: { 
  field: string;
  currentSort: string;
  currentOrder: string;
  searchParams: SearchParams;
  children: React.ReactNode;
}) {
  const isActive = currentSort === field;
  const nextOrder = isActive && currentOrder === 'desc' ? 'asc' : 'desc';
  
  const params = new URLSearchParams();
  if (searchParams.search) params.set('search', searchParams.search);
  if (searchParams.tag) params.set('tag', searchParams.tag);
  if (searchParams.blocked) params.set('blocked', searchParams.blocked);
  params.set('sort', field);
  params.set('order', nextOrder);

  return (
    <Link 
      href={`/users?${params.toString()}`}
      className="flex items-center gap-1 hover:text-gray-900"
    >
      {children}
      {isActive ? (
        currentOrder === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-30" />
      )}
    </Link>
  );
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { users, total, page, totalPages } = await getUsers(searchParams);
  const allTags = await getAllTags();
  const currentSort = searchParams.sort || 'created_at';
  const currentOrder = searchParams.order || 'desc';

  // Build URL helper
  const buildUrl = (newParams: Partial<SearchParams>) => {
    const params = new URLSearchParams();
    const merged = { ...searchParams, ...newParams };
    if (merged.search) params.set('search', merged.search);
    if (merged.tag) params.set('tag', merged.tag);
    if (merged.sort) params.set('sort', merged.sort);
    if (merged.order) params.set('order', merged.order);
    if (merged.blocked) params.set('blocked', merged.blocked);
    if (merged.page && merged.page !== '1') params.set('page', merged.page);
    return `/users?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Пользователи</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <form className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="search"
                defaultValue={searchParams.search}
                placeholder="Поиск по имени, username или ID"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Tag filter */}
          <select
            name="tag"
            defaultValue={searchParams.tag}
            className="px-4 py-2 border border-gray-200 rounded-lg min-w-[150px]"
          >
            <option value="">Все теги</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          {/* Blocked filter */}
          <select
            name="blocked"
            defaultValue={searchParams.blocked}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Все статусы</option>
            <option value="false">Активные</option>
            <option value="true">Заблокированные</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Применить
          </button>

          {(searchParams.search || searchParams.tag || searchParams.blocked) && (
            <Link
              href="/users"
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Сбросить
            </Link>
          )}
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        {users.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Пользователи не найдены
            </h3>
            <p className="text-gray-500">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Пользователь
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortLink field="credits" currentSort={currentSort} currentOrder={currentOrder} searchParams={searchParams}>
                      Токены
                    </SortLink>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortLink field="cards_created" currentSort={currentSort} currentOrder={currentOrder} searchParams={searchParams}>
                      Карточек
                    </SortLink>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortLink field="total_spent" currentSort={currentSort} currentOrder={currentOrder} searchParams={searchParams}>
                      Потрачено
                    </SortLink>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Теги
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortLink field="created_at" currentSort={currentSort} currentOrder={currentOrder} searchParams={searchParams}>
                      Регистрация
                    </SortLink>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user: any) => (
                  <tr key={user.id} className={`hover:bg-gray-50 ${user.is_blocked ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {(user.first_name || user.username || '?')[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.first_name || 'Без имени'}
                            {user.is_blocked && <span className="ml-2 text-xs text-red-500">заблокирован</span>}
                          </p>
                          <p className="text-sm text-gray-500">
                            {user.username ? `@${user.username}` : `ID: ${user.telegram_id}`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{user.credits || 0}</td>
                    <td className="px-6 py-4 text-gray-600">{user.cards_created || 0}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.total_spent ? `${user.total_spent} ₽` : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.tags?.slice(0, 3).map((tag: string) => (
                          <Link
                            key={tag}
                            href={buildUrl({ tag, page: '1' })}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200"
                          >
                            {tag}
                          </Link>
                        ))}
                        {user.tags?.length > 3 && (
                          <span className="px-2 py-0.5 text-gray-400 text-xs">
                            +{user.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <UserActions user={user} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Показано {(page - 1) * 20 + 1}–{Math.min(page * 20, total)} из {total}
          </p>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link
                href={buildUrl({ page: String(page - 1) })}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Назад
              </Link>
            )}
            <span className="px-4 py-2 text-gray-600">
              {page} / {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={buildUrl({ page: String(page + 1) })}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Вперёд
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

```

# app/users/UserActions.tsx

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  MoreVertical,
  Send,
  Gift,
  Ban,
  Tag,
  X,
} from 'lucide-react';

interface User {
  id: string;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  credits: number;
  is_blocked: boolean;
  tags: string[];
}

export default function UserActions({ user }: { user: User }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState<'message' | 'credits' | 'tags' | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [message, setMessage] = useState('');
  const [parseMode, setParseMode] = useState<'HTML' | 'Markdown'>('HTML');
  const [creditsAmount, setCreditsAmount] = useState('');
  const [newTag, setNewTag] = useState('');
  const [userTags, setUserTags] = useState<string[]>(user.tags || []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/users/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId: user.telegram_id,
          message,
          parseMode,
        }),
      });

      if (res.ok) {
        toast.success('Сообщение отправлено');
        setShowModal(null);
        setMessage('');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Ошибка отправки');
      }
    } catch (error) {
      toast.error('Ошибка отправки');
    } finally {
      setLoading(false);
    }
  };

  const handleGiveCredits = async () => {
    const amount = parseInt(creditsAmount);
    if (!amount || amount === 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/users/give-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          amount,
        }),
      });

      if (res.ok) {
        toast.success(`Начислено ${amount} токенов`);
        setShowModal(null);
        setCreditsAmount('');
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/toggle-block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          block: !user.is_blocked,
        }),
      });

      if (res.ok) {
        toast.success(user.is_blocked ? 'Пользователь разблокирован' : 'Пользователь заблокирован');
        router.refresh();
      } else {
        toast.error('Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setLoading(false);
      setShowMenu(false);
    }
  };

  const handleUpdateTags = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/update-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          tags: userTags,
        }),
      });

      if (res.ok) {
        toast.success('Теги обновлены');
        setShowModal(null);
        router.refresh();
      } else {
        toast.error('Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !userTags.includes(newTag.trim())) {
      setUserTags([...userTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setUserTags(userTags.filter(t => t !== tag));
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>

        {showMenu && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowMenu(false)} 
            />
            <div className="fixed right-4 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <button
                onClick={() => { setShowModal('message'); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Отправить сообщение
              </button>
              <button
                onClick={() => { setShowModal('credits'); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Gift className="w-4 h-4" />
                Начислить токены
              </button>
              <button
                onClick={() => { setShowModal('tags'); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Tag className="w-4 h-4" />
                Управление тегами
              </button>
              <hr className="my-1" />
              <button
                onClick={handleToggleBlock}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${
                  user.is_blocked ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <Ban className="w-4 h-4" />
                {user.is_blocked ? 'Разблокировать' : 'Заблокировать'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Send Message Modal */}
      {showModal === 'message' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Отправить сообщение
              </h3>
              <button onClick={() => setShowModal(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Получатель: {user.first_name || user.username || `ID: ${user.telegram_id}`}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Формат</label>
                <select
                  value={parseMode}
                  onChange={(e) => setParseMode(e.target.value as 'HTML' | 'Markdown')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="HTML">HTML</option>
                  <option value="Markdown">Markdown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Сообщение</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  placeholder={parseMode === 'HTML' 
                    ? '<b>Жирный</b>, <i>курсив</i>, <code>код</code>'
                    : '*Жирный*, _курсив_, `код`'
                  }
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={loading || !message.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Отправка...' : 'Отправить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Give Credits Modal */}
      {showModal === 'credits' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Начислить токены</h3>
              <button onClick={() => setShowModal(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Текущий баланс: {user.credits} токенов
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Количество токенов
                </label>
                <input
                  type="number"
                  value={creditsAmount}
                  onChange={(e) => setCreditsAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Введите число (можно отрицательное)"
                />
              </div>

              <div className="flex gap-2">
                {[10, 50, 100, 200].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setCreditsAmount(String(amount))}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                  >
                    +{amount}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleGiveCredits}
                  disabled={loading || !creditsAmount}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Сохранение...' : 'Начислить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tags Modal */}
      {showModal === 'tags' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Управление тегами</h3>
              <button onClick={() => setShowModal(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Новый тег"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Добавить
                </button>
              </div>

              <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-gray-50 rounded-lg">
                {userTags.length === 0 ? (
                  <span className="text-gray-400 text-sm">Нет тегов</span>
                ) : (
                  userTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded flex items-center gap-1"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleUpdateTags}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

```

# components/Sidebar.tsx

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Send,
  Target,
  Smartphone,
  Users2,
  UserPlus,
  Megaphone,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Дашборд', href: '/', icon: LayoutDashboard },
  { name: 'Пользователи', href: '/users', icon: Users },
  { name: 'Рассылки', href: '/broadcasts', icon: Send },
];

const outreachItems = [
  { name: 'Обзор', href: '/outreach', icon: Target },
  { name: 'Аккаунты', href: '/outreach/accounts', icon: Smartphone },
  { name: 'Группы', href: '/outreach/groups', icon: Users2 },
  { name: 'Кампании', href: '/outreach/campaigns', icon: Megaphone },
  { name: 'Лиды', href: '/outreach/leads', icon: UserPlus },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [outreachOpen, setOutreachOpen] = useState(pathname.startsWith('/outreach'));

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">MerchantAI</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}

        {/* Outreach Section */}
        <div>
          <button
            onClick={() => setOutreachOpen(!outreachOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname.startsWith('/outreach') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5" />
              Аутрич
            </div>
            {outreachOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {outreachOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-4">
              {outreachItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

```

# lib/gramjs.ts

```ts
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { Api } from 'telegram/tl';

// Store active clients in memory (for verification process)
const activeClients: Map<string, TelegramClient> = new Map();
const pendingVerifications: Map<string, { phone: string; phoneCodeHash: string; apiId: number; apiHash: string }> = new Map();

export async function createClient(apiId: number, apiHash: string, sessionString = ''): Promise<TelegramClient> {
  const session = new StringSession(sessionString);
  const client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
  });
  return client;
}

export async function sendVerificationCode(
  accountId: string,
  phone: string,
  apiId: number,
  apiHash: string
): Promise<{ success: boolean; phoneCodeHash?: string; error?: string }> {
  try {
    const client = await createClient(apiId, apiHash);
    await client.connect();

    const result = await client.sendCode(
      { apiId, apiHash },
      phone
    );

    // Store client and verification info
    activeClients.set(accountId, client);
    pendingVerifications.set(accountId, {
      phone,
      phoneCodeHash: result.phoneCodeHash,
      apiId,
      apiHash,
    });

    return { success: true, phoneCodeHash: result.phoneCodeHash };
  } catch (error: any) {
    console.error('Send code error:', error);
    return { success: false, error: error.message || 'Failed to send code' };
  }
}

export async function verifyCode(
  accountId: string,
  code: string,
  password?: string
): Promise<{ success: boolean; sessionString?: string; error?: string }> {
  try {
    const client = activeClients.get(accountId);
    const pending = pendingVerifications.get(accountId);

    if (!client || !pending) {
      return { success: false, error: 'No pending verification found. Please request a new code.' };
    }

    try {
      // Use proper signIn method
      await client.invoke(
        new Api.auth.SignIn({
          phoneNumber: pending.phone,
          phoneCodeHash: pending.phoneCodeHash,
          phoneCode: code,
        })
      );
    } catch (signInError: any) {
      console.error('SignIn error:', signInError.errorMessage || signInError.message);
      
      // Check if 2FA is required
      if (signInError.errorMessage === 'SESSION_PASSWORD_NEEDED') {
        if (!password) {
          return { success: false, error: '2FA_REQUIRED' };
        }
        
        // Handle 2FA - get password info and check
        try {
          const passwordInfo = await client.invoke(new Api.account.GetPassword());
          const passwordSrp = await client.computeSrpHash(passwordInfo, password);
          
          await client.invoke(
            new Api.auth.CheckPassword({
              password: passwordSrp,
            })
          );
        } catch (pwdError: any) {
          console.error('2FA error:', pwdError);
          return { success: false, error: 'Invalid 2FA password' };
        }
      } else if (signInError.errorMessage === 'PHONE_CODE_INVALID') {
        return { success: false, error: 'Invalid code. Please try again.' };
      } else if (signInError.errorMessage === 'PHONE_CODE_EXPIRED') {
        return { success: false, error: 'Code expired. Please request a new one.' };
      } else {
        throw signInError;
      }
    }

    // Get session string
    const sessionString = client.session.save() as unknown as string;

    // Cleanup
    activeClients.delete(accountId);
    pendingVerifications.delete(accountId);

    return { success: true, sessionString };
  } catch (error: any) {
    console.error('Verify code error:', error);
    return { success: false, error: error.message || 'Failed to verify code' };
  }
}

export async function checkConnection(
  apiId: number,
  apiHash: string,
  sessionString: string
): Promise<{ connected: boolean; user?: any; error?: string }> {
  try {
    const client = await createClient(apiId, apiHash, sessionString);
    await client.connect();

    const me = await client.getMe();
    await client.disconnect();

    return {
      connected: true,
      user: {
        id: me?.id?.toString(),
        username: me?.username,
        firstName: me?.firstName,
        lastName: me?.lastName,
        phone: me?.phone,
      },
    };
  } catch (error: any) {
    console.error('Check connection error:', error);
    return { connected: false, error: error.message };
  }
}

export async function sendMessage(
  apiId: number,
  apiHash: string,
  sessionString: string,
  target: string | number,
  message: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await createClient(apiId, apiHash, sessionString);
    await client.connect();

    await client.sendMessage(target, { message });
    await client.disconnect();

    return { success: true };
  } catch (error: any) {
    console.error('Send message error:', error);
    return { success: false, error: error.message };
  }
}
```

# lib/supabase.ts

```ts
import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client (with service role for admin operations)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Client-side Supabase client
export const createBrowserClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

```

# lib/telegram.ts

```ts
// Telegram Bot API wrapper for admin dashboard

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export interface TelegramMessage {
  chat_id: number;
  text: string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  disable_notification?: boolean;
}

export interface SendResult {
  success: boolean;
  message_id?: number;
  error?: string;
}

export async function sendMessage(params: TelegramMessage): Promise<SendResult> {
  try {
    const response = await fetch(`${API_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (data.ok) {
      return { success: true, message_id: data.result.message_id };
    } else {
      return { success: false, error: data.description };
    }
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function sendBulkMessages(
  messages: TelegramMessage[],
  delayMs = 50
): Promise<{ success: number; failed: number; errors: string[] }> {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[],
  };

  for (const msg of messages) {
    const result = await sendMessage(msg);
    
    if (result.success) {
      results.success++;
    } else {
      results.failed++;
      results.errors.push(`Chat ${msg.chat_id}: ${result.error}`);
    }

    // Rate limiting - Telegram allows 30 messages/second
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  return results;
}

// HTML formatting helpers
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function bold(text: string): string {
  return `<b>${escapeHtml(text)}</b>`;
}

export function italic(text: string): string {
  return `<i>${escapeHtml(text)}</i>`;
}

export function code(text: string): string {
  return `<code>${escapeHtml(text)}</code>`;
}

export function link(text: string, url: string): string {
  return `<a href="${url}">${escapeHtml(text)}</a>`;
}

```

# lib/utils.ts

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'dd.MM.yyyy HH:mm', { locale: ru });
}

export function formatDateShort(date: string | Date): string {
  return format(new Date(date), 'dd.MM.yyyy', { locale: ru });
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ru });
}

export function formatCurrency(amount: number, currency = 'RUB'): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ru-RU').format(num);
}

// Generate referral link
export function generateReferralLink(referralCode: string, botUsername: string): string {
  return `https://t.me/${botUsername}?start=ref_${referralCode}`;
}

// Generate UTM link
export function generateUtmLink(
  botUsername: string,
  source: string,
  campaign?: string,
  medium?: string
): string {
  const params = [`utm_source=${source}`];
  if (campaign) params.push(`utm_campaign=${campaign}`);
  if (medium) params.push(`utm_medium=${medium}`);
  
  return `https://t.me/${botUsername}?start=${params.join('__')}`;
}

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

```

# next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

```

# package.json

```json
{
  "name": "merchantai-admin",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@supabase/supabase-js": "^2.39.0",
    "telegram": "^2.19.0",
    "lucide-react": "^0.294.0",
    "date-fns": "^2.30.0",
    "recharts": "^2.10.0",
    "react-hot-toast": "^2.4.1",
    "input": "^1.0.1"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0"
  }
}

```

# postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

# README.md

```md
# MerchantAI Admin Dashboard

Панель управления для Telegram бота MerchantAI. Включает управление пользователями, рассылки, аутрич-систему и реферальную программу.

## Возможности

### 📊 Дашборд
- Обзор ключевых метрик
- Новые пользователи
- Выручка
- Активные кампании

### 👥 Управление пользователями
- Просмотр всех пользователей
- Поиск и фильтрация по тегам
- Отправка личных сообщений (с HTML/Markdown)
- Начисление/списание токенов
- Управление тегами для сегментации
- Блокировка пользователей

### 📤 Рассылки
- Создание массовых рассылок
- Таргетинг: все / по тегам / конкретные пользователи
- Поддержка HTML и Markdown
- Предпросмотр сообщений
- Статистика доставки

### 🎯 Аутрич-система
- **Группы**: База групп для размещения объявлений
  - Одиночное добавление
  - Массовый импорт
  - Категоризация
  
- **Кампании**: Настройка автоматических кампаний
  - Шаблоны сообщений для групп
  - Шаблоны DM для ответивших
  - Настройка задержек
  
- **Лиды**: Управление откликнувшимися
  - Статусы: новый → связались → ответил → квалифицирован → конвертирован
  - Отправка DM
  - Отслеживание конверсий

- **Аккаунты**: Telegram аккаунты для аутрича
  - Подключение через API ID/Hash
  - Лимиты сообщений
  - Ротация аккаунтов

### 🔗 Реферальная программа
- Автоматическая генерация реферальных кодов
- Отслеживание UTM-меток
- Комиссия 10% от покупок приглашённых
- Статистика в профиле пользователя

## Установка

\`\`\`bash
cd admin-dashboard
npm install
cp .env.example .env.local
# Заполните переменные окружения
npm run dev
\`\`\`

## Переменные окружения

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Telegram Bot
TELEGRAM_BOT_TOKEN=your-bot-token
\`\`\`

## База данных

Выполните SQL-скрипт `supabase/schema.sql` в Supabase SQL Editor для создания всех необходимых таблиц.

### Основные таблицы:
- `users` - пользователи с реферальной информацией
- `orders` - заказы
- `payments` - платежи
- `broadcasts` - рассылки
- `broadcast_recipients` - получатели рассылок
- `outreach_accounts` - Telegram аккаунты для аутрича
- `outreach_groups` - группы для аутрича
- `outreach_campaigns` - кампании
- `outreach_leads` - лиды
- `outreach_messages` - история сообщений
- `referral_transactions` - реферальные выплаты

## Реферальные ссылки

Формат ссылок для бота:

\`\`\`
# Простая реферальная ссылка
https://t.me/YourBot?start=ref_XXXXXXXX

# С UTM-метками
https://t.me/YourBot?start=utm_source=instagram__utm_campaign=launch

# Комбинированная
https://t.me/YourBot?start=ref_XXXXXXXX__utm_source=instagram
\`\`\`

## Аутрич: как это работает

1. **Добавьте группы** в базу (вручную или массовый импорт)
2. **Подключите Telegram аккаунты** для отправки сообщений
3. **Создайте кампанию** с шаблонами сообщений
4. **Запустите кампанию** - система будет:
   - Отправлять сообщения в группы
   - Собирать ответивших как лиды
   - Автоматически отправлять DM
5. **Обрабатывайте лиды** - меняйте статусы, отслеживайте конверсии

## Технологии

- **Next.js 14** - React фреймворк
- **Supabase** - База данных и авторизация
- **Tailwind CSS** - Стили
- **Lucide React** - Иконки
- **React Hot Toast** - Уведомления

## Структура проекта

\`\`\`
admin-dashboard/
├── app/
│   ├── page.tsx              # Дашборд
│   ├── users/                # Пользователи
│   ├── broadcasts/           # Рассылки
│   ├── outreach/            # Аутрич
│   │   ├── groups/          # Группы
│   │   ├── leads/           # Лиды
│   │   ├── accounts/        # Аккаунты
│   │   └── campaigns/       # Кампании
│   └── api/                 # API routes
├── components/              # Компоненты
├── lib/                     # Утилиты
└── types/                   # TypeScript типы
\`\`\`

## TODO / Roadmap

- [ ] Авторизация для админки
- [ ] Интеграция gram.js для реального аутрича
- [ ] Планировщик рассылок (cron)
- [ ] Графики и аналитика (Recharts)
- [ ] Экспорт данных в CSV
- [ ] Webhook для YooKassa
- [ ] Real-time обновления (Supabase Realtime)

```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

# types/index.ts

```ts
// Database types for admin dashboard

export interface User {
  id: string;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  plan: string;
  credits: number;
  cards_created: number;
  referral_code: string;
  referred_by: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  utm_medium: string | null;
  start_param: string | null;
  total_spent: number;
  referral_earnings: number;
  referrals_count: number;
  is_blocked: boolean;
  is_admin: boolean;
  notes: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  type: 'image_card' | 'photo_session' | 'image_edit';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  input_data: Record<string, any>;
  output_data: Record<string, any> | null;
  credits_used: number;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  plan: string;
  amount: number;
  currency: string;
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';
  yookassa_payment_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Broadcast {
  id: string;
  title: string | null;
  message: string;
  message_html: string | null;
  parse_mode: 'HTML' | 'Markdown' | 'None';
  target_type: 'all' | 'segment' | 'specific';
  target_tags: string[];
  target_user_ids: string[];
  total_recipients: number;
  sent_count: number;
  failed_count: number;
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'failed';
  scheduled_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_by: string | null;
  created_at: string;
}

export interface OutreachAccount {
  id: string;
  phone: string;
  api_id: string;
  api_hash: string;
  session_string: string | null;
  name: string | null;
  status: 'connected' | 'disconnected' | 'banned' | 'limited';
  daily_messages_sent: number;
  daily_limit: number;
  last_message_at: string | null;
  cooldown_until: string | null;
  total_messages_sent: number;
  total_replies: number;
  created_at: string;
  updated_at: string;
}

export interface OutreachGroup {
  id: string;
  telegram_id: number | null;
  username: string | null;
  title: string;
  member_count: number | null;
  category: string | null;
  tags: string[];
  status: 'active' | 'paused' | 'banned';
  last_scraped_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface OutreachCampaign {
  id: string;
  name: string;
  group_message: string;
  dm_templates: { text: string; delay?: number }[];
  target_group_ids: string[];
  target_categories: string[];
  replies_per_account: number;
  delay_between_messages: number;
  messages_sent: number;
  replies_received: number;
  conversations_started: number;
  status: 'draft' | 'active' | 'paused' | 'completed';
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OutreachLead {
  id: string;
  campaign_id: string;
  account_id: string;
  group_id: string;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  initial_message: string | null;
  status: 'new' | 'contacted' | 'replied' | 'qualified' | 'converted' | 'rejected';
  dm_sent: boolean;
  dm_sent_at: string | null;
  dm_template_used: number | null;
  converted_user_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DailyStats {
  id: string;
  date: string;
  new_users: number;
  active_users: number;
  cards_generated: number;
  revenue: number;
  referral_signups: number;
  outreach_leads: number;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  todayRevenue: number;
  cardsGenerated: number;
  activeOutreachCampaigns: number;
  pendingLeads: number;
}

```

