import { getSection } from "@/server/db/getSection";
import Form from "./_components/Form";
import { getServices } from "@/server/db/services";

const page = async () => {
  const sections = await getSection({ role: "admin", locale: "ar" });
  const services = await getServices({ role: "admin", locale: "ar" });
  console.log(services);

  return (
    <main className="container mx-auto p-4 Navbar-gap mt-16">
      <Form section={sections}  />
    </main>
  );
};

export default page;
