import PublicLayout from "@/components/PublicLayout";

export const revalidate = 300;

export const metadata = {
  title: "About Us | Satta King Fast",
  description: "Learn about Satta King Fast — fast result updates, old charts, and market-wise records.",
  alternates: { canonical: "/about-us" },
};

export default function AboutPage() {
  return (
    <PublicLayout>
      <main className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">About Us</h1>
        <p className="leading-relaxed">Satta King Fast provides fast result updates, old charts, and market-wise records. This Next.js version keeps the same public experience while using MongoDB for easier deployment.</p>
      </main>
    </PublicLayout>
  );
}
