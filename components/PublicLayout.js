import Link from "next/link";
import { getContact } from "@/lib/data";

export default async function PublicLayout({ children }) {
  const contact = await getContact();
  const year = new Date().getFullYear();
  const whatsapp = contact?.contactNumber || "";

  return (
    <section>
      <div className="text-center text-2xl text-white py-2">
        <div className="flex justify-center">
          <Link href="/">
            <img className="site-logo" alt="SattaKingFast" src="/img/logosm.jpg" />
          </Link>
        </div>
      </div>
      <div>
        <nav className="flex border border-white">
          <Link className="flex items-center justify-center md:px-16 bg-red-600 border-r border-white px-3" href="/" aria-label="Home">
            <span className="text-white text-3xl">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path>
              </svg>
            </span>
          </Link>
          <Link className="w-full bg-blue-600 border-r border-white text-white font-semibold text-center py-3 text-sm px-3" href="/">
            Home
          </Link>
          <Link className="w-full bg-blue-600 border-r border-white text-white font-semibold text-center py-3 text-sm px-3" href="/charts">
            Charts
          </Link>
          <a className="w-full bg-blue-600 border-r border-white text-white font-semibold text-center py-3 text-sm px-3" href={`https://wa.me/+${whatsapp}`} target="_blank">
            Contact
          </a>
          <Link className="md:px-12 md:whitespace-nowrap bg-green-800 text-white font-semibold text-center py-3 text-sm px-3" href="/admin/login">
            Login
          </Link>
        </nav>
        <marquee className="bg-[#8b0038] border border-white text-white font-semibold text-right px-4 py-3 text-xs md:text-sm">
          SATTA KING, SATTAKING, SATTA RESULT, GALI RESULT, GALI SATTA, SATTA BAZAR, GALI SATTA RESULT, SATTA KING 2024 SATTA KING 2025, SATTA KING RESULT, SATTA KING UP, SATTA GAME TODAY RESULT, SATTA RESULT CHART, SATTA KING LIVE, DESAWAR SATTA, FARIDABAD SATTA, FARIDABAD RESULT, BLACK SATTA KING
        </marquee>
        <p className="yellow_bg text-center py-3 font-semibold mx-1">Satta king | Satta result | सत्ता किंग</p>
      </div>
      {children}
      <a href={`https://wa.me/+${whatsapp}?text=${encodeURIComponent(contact?.name || "")}`} className="floating" target="_blank" rel="noreferrer">
        <span className="fab-icon">☎</span>
      </a>
      <footer className="mt-8">
        <div className="mx-5 border-2 border-blue-600 rounded-md p-6 bg-white text-center space-y-6">
          <div>
            <h2 className="text-red-600 font-bold text-xl mb-2">What is Satta King Fast</h2>
            <p className="text-gray-800 leading-relaxed">Satta King Fast refers to a popular number-based betting system where participants place bids on digits ranging from 00-99. This website keeps live results and old record charts for major markets.</p>
          </div>
          <div>
            <h2 className="text-red-600 font-bold text-xl mb-2">How Satta King Fast charts help in finding leak jodi</h2>
            <p className="text-gray-800 leading-relaxed">Players study Satta King Fast charts and historical results to identify patterns and trends. No method guarantees success, but old charts make comparison easier.</p>
          </div>
          <div>
            <h2 className="text-red-600 font-bold text-xl mb-2">How can I check old Satta King Fast results?</h2>
            <p className="text-gray-800 leading-relaxed">Use the monthly and yearly chart pages to check market-wise records by date and year.</p>
          </div>
        </div>
        <div className="bg-black text-center text-white py-8 mt-8 px-5">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Link className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-sm text-sm font-semibold" href="/about-us">ABOUT US</Link>
            <Link className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-sm text-sm font-semibold" href="/disclaimer">DISCLAIMER</Link>
            <Link className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-sm text-sm font-semibold" href="/Privacy-Policy">PRIVACY POLICY</Link>
          </div>
          <p className="text-gray-300 text-sm border-t border-gray-600 pt-4">Copyright © 2018-{year} - Satta King Fast</p>
        </div>
      </footer>
    </section>
  );
}
