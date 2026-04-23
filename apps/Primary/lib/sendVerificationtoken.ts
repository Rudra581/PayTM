import { transporter } from "./mail";
const domain = "http://localhost:3001";
export async function sendVerificationToken(email: string, token: string) {
  const link = `${domain}/verify?token=${token}`;

  await transporter.sendMail({
    from: "rudraprajapati1062@gmail.com",
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Welcome 👋</h2>
      <p>Please verify your email by clicking the button below:</p>
      <a 
        href="${link}"
        style="
          display:inline-block;
          padding:12px 20px;
          background:black;
          color:white;
          text-decoration:none;
          border-radius:6px;
        "
      >
        Verify Email
      </a>
      <p>If you didn’t create this account, ignore this email.</p>
    `,
  });
}
