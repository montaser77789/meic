import { Locale } from "@/i18n.config";
import AdminSidepar from "./_components/AdminSidepar";
import { Alexandria } from "next/font/google";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  display: "swap",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={`${alexandria.variable} antialiased`}>
      <div dir="rtl" className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 hidden lg:block bg-white text-primary shadow-lg">
          <AdminSidepar locale={"ar" as Locale} />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </body>
  );
}
