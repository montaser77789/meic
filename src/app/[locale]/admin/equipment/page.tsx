import { getSection } from "@/server/db/getSection";
import Form from "./_components/Form";

export default async function page() {
      const sections = await getSection({ role: "admin", locale: "ar" });
    
  return (
    <main className="mt-16">
        <div className="container">
            <Form section={sections} />
        </div>
      
    </main>
  )
}
