const { createClient } = require('@supabase/supabase-js');

const client = createClient(
  'https://lfeqwqcbhjkedclxihlw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZXF3cWNiaGprZWRjbHhpaGx3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzM0Nzc4OSwiZXhwIjoyMDgyOTIzNzg5fQ.t19ZWbKQsDFKNiA2bWjL31tXA0Z5apQYzI42NZNf2U0'
);

async function fetch() {
  const { data, error } = await client
    .from('prompt_templates')
    .select('*');
  
  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }
  
  console.log(JSON.stringify(data, null, 2));
  process.exit(0);
}

fetch();
