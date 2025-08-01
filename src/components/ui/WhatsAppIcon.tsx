// components/WhatsAppIcon.tsx
"use client";
import { FaWhatsapp } from "react-icons/fa";
import { Locale } from "@/i18n.config";

const WhatsAppIcon = ({ locale }: { locale: Locale }) => {
  const phoneNumber = "966554097005"; // بدون 0 في البداية مع كود الدولة
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-4 ${
        locale === "ar" ? "right-4" : "left-4"
      } z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition duration-300`}
      aria-label="WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppIcon;
