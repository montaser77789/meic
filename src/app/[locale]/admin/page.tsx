import { getSection } from "@/server/db/getSection";
import Form from "./_components/Form";
import SectionAdmin from "./_components/SectionAdmin";

const AdminPage = async () => {
  const section = await getSection({ role: "admin", locale: "en" });
  return (
    <main className="container mx-auto p-4 Navbar-gap mt-16">
      <h1 className="text-2xl md:text-5xl font-bold text-primary py-2 text-center">
        اضافة قسم
      </h1>
      <Form />
      <div>
        <SectionAdmin section={section} />
      </div>
    </main>
  );
};

export default AdminPage;
