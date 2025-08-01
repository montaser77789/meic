"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Section } from "@prisma/client";

export function SelectedSectionId({
  section,
  setSelectedSectionId,
}: {
  section: Section[];
  setSelectedSectionId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  console.log(section);
  return (
    <Select  onValueChange={(value) => setSelectedSectionId(value)}>
      <SelectTrigger className="w-[500px]">
        <SelectValue placeholder="اختر القسم" />
      </SelectTrigger>
      <SelectContent className="w-[500px] p-2 ">
        <SelectGroup>
          {section &&
            section.map((section: Section) => (
              <SelectItem key={section.id} value={section.id}>
                {section.title_ar}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
