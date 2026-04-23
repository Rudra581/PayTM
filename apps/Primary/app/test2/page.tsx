"use client";

export default function Page() {
  const send = async () => {
    await fetch("/api/send", {
      method: "POST",
    });
    alert("Email sent! Check inbox.");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-xl font-bold">Brevo Email Test</h1>
      <button
        onClick={send}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Send Test Email
      </button>
    </div>
  );
}
