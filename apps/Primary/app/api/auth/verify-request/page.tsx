export default function VerifyRequest() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-[#00BAF2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
      <p className="text-gray-500 max-w-xs mx-auto mb-8">
        A magic link has been sent to your inbox. Click the link to securely sign in.
      </p>
      <div className="text-sm text-gray-400">
        Check your spam folder if you don't see it.
      </div>
    </div>
  );
}