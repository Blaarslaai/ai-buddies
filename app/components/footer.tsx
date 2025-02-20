export default function Footer() {
  return (
    <footer className="bg-black text-slate-300 py-4 rounded-xl m-5">
      <div className="container mx-auto flex flex-row">
        {/* Row for links, aligned to the left */}
        <div className="justify-start space-x-4">
          <a
            href="https://astralcomputers.net/termsOfService"
            target="_blank"
            className="hover:text-white"
          >
            Terms of Service
          </a>
          <a
            href="https://astralcomputers.net/privacyNotice"
            target="_blank"
            className="hover:text-white"
          >
            Privacy Notice
          </a>
          <a
            href="https://astralcomputers.net/refundPolicy"
            target="_blank"
            className="hover:text-white"
          >
            Refund Policy
          </a>
        </div>
        {/* Row for copyright, centered */}
        <div className="flex flex-1 w-full justify-center">
          <p>© 2025 AI Buddies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
