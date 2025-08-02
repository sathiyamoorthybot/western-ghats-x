import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  teamData: {
    teamName: string;
    captainName: string;
    captainPhone: string;
    captainEmail: string;
    players: Array<{ name: string; age: string; }>;
  };
  paymentStatus: string;
  registrationId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { teamData, paymentStatus, registrationId }: EmailRequest = await req.json();

    // Create HTML for player list
    const playersHtml = teamData.players.map((player, index) => 
      `<tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${index + 1}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${player.name}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${player.age}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${index < 7 ? 'Playing XI' : 'Substitute'}</td>
      </tr>`
    ).join('');

    const userEmailHtml = `
      <h2>Cricket Tournament Registration Confirmation</h2>
      <p>Dear ${teamData.captainName},</p>
      <p>Thank you for registering your team <strong>${teamData.teamName}</strong> for the Cricket Tournament 2025!</p>
      
      <h3>Registration Details:</h3>
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <tr><td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>Team Name:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${teamData.teamName}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>Captain:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${teamData.captainName}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>Phone:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${teamData.captainPhone}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>Email:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${teamData.captainEmail}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>Payment Status:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${paymentStatus}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>Registration ID:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${registrationId}</td></tr>
      </table>

      <h3>Team Players:</h3>
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid #ddd; padding: 8px;">S.No</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Age</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Type</th>
        </tr>
        ${playersHtml}
      </table>

      <p>Best regards,<br>Western Ghats X Team</p>
    `;

    const adminEmailHtml = `
      <h2>New Cricket Tournament Registration</h2>
      <p>A new team has registered for the Cricket Tournament 2025.</p>
      
      <h3>Registration Details:</h3>
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <tr><td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>Team Name:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${teamData.teamName}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>Captain:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${teamData.captainName}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>Phone:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${teamData.captainPhone}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>Email:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${teamData.captainEmail}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>Payment Status:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${paymentStatus}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;"><strong>Registration ID:</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${registrationId}</td></tr>
      </table>

      <h3>Team Players:</h3>
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid #ddd; padding: 8px;">S.No</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Age</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Type</th>
        </tr>
        ${playersHtml}
      </table>
    `;

    // Send emails to both user and admin
    const [userEmailResponse, adminEmailResponse] = await Promise.all([
      resend.emails.send({
        from: "Western Ghats X <noreply@westernghats-x.com>",
        to: [teamData.captainEmail],
        subject: "Cricket Tournament Registration Confirmation",
        html: userEmailHtml,
      }),
      resend.emails.send({
        from: "Western Ghats X <noreply@westernghats-x.com>",
        to: ["admin@westernghats-x.com"],
        subject: `New Cricket Registration: ${teamData.teamName}`,
        html: adminEmailHtml,
      })
    ]);

    console.log("Emails sent:", { userEmailResponse, adminEmailResponse });

    return new Response(
      JSON.stringify({ 
        success: true, 
        userEmailId: userEmailResponse.data?.id,
        adminEmailId: adminEmailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending registration emails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);