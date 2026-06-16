import PublicLayout from "@/components/PublicLayout";

export const revalidate = 300;

export const metadata = {
  title: "Disclaimer | Satta King Fast",
  description: "Read the Satta King Fast disclaimer. Information is for record purposes only.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <PublicLayout>
      <main className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Disclaimer</h1>
        <p className="leading-relaxed">The information on this website is provided for record and informational purposes. Visitors are responsible for following all laws applicable in their location.</p>
      </main>
    </PublicLayout>
  );
}
