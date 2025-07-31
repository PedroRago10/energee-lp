// Form submission handler with Mautic integration
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, email, phone, estado, consumption, message } = await req.json()

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Save to database
    const { data: submission, error: dbError } = await supabase
      .from('form_submissions')
      .insert([{
        name,
        email,
        phone,
        estado,
        consumption,
        message,
        source: 'website'
      }])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw dbError
    }

    // Get Mautic settings
    const { data: settings } = await supabase
      .from('site_settings')
      .select('setting_key, setting_value')
      .in('setting_key', ['mautic_api_url', 'mautic_api_token'])

    const mauticUrl = settings?.find(s => s.setting_key === 'mautic_api_url')?.setting_value
    const mauticToken = settings?.find(s => s.setting_key === 'mautic_api_token')?.setting_value

    // Send to Mautic if configured
    if (mauticUrl && mauticToken) {
      try {
        const mauticResponse = await fetch(`${mauticUrl}/api/contacts/new`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${mauticToken}`
          },
          body: JSON.stringify({
            firstname: name.split(' ')[0],
            lastname: name.split(' ').slice(1).join(' '),
            email,
            phone,
            state: estado,
            consumption,
            tags: ['website-lead', 'energee-form']
          })
        })

        if (!mauticResponse.ok) {
          console.error('Mautic error:', await mauticResponse.text())
        } else {
          console.log('Lead sent to Mautic successfully')
        }
      } catch (mauticError) {
        console.error('Mautic integration error:', mauticError)
        // Don't fail the request if Mautic fails
      }
    }

    // Track analytics event
    await supabase
      .from('analytics_events')
      .insert([{
        event_type: 'form_submission',
        event_data: { form_type: 'lead_capture', source: 'website' },
        user_agent: req.headers.get('user-agent'),
        referrer: req.headers.get('referer')
      }])

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Formulário enviado com sucesso!',
        submissionId: submission.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error processing form:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Erro ao processar formulário. Tente novamente.' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})