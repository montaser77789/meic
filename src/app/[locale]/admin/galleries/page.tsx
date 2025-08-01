import { getSection } from "@/server/db/getSection";
import Form from "./_components/Form";

const page = async () => {
      const sections = await getSection({ role: "admin", locale: "ar" });
    
  return (
    <main className="container mx-auto p-4 Navbar-gap mt-16">
      <h1>معرض الصور</h1>
      <div>
        <Form section={sections} />
      </div>
    </main>
  );
};

export default page;
