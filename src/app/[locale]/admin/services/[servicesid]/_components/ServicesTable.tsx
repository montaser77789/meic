import { Service } from "@prisma/client";
import Image from "next/image";
import EditServices from "./EditServices";
import DeleteServices from "./DeleteServices";

interface ServicesTableProps {
  services: Service[];
  servicesid: string;
}

const ServicesCard = ({ service  ,servicesid}: { service: Service ;servicesid: string }) => {
  return (
    <div className="w-full  bg-white rounded-lg shadow-lg overflow-hidden mt-12">
      <div className="relative w-full h-56">
        {service?.image && service.image.startsWith("http") && (
          <Image
            src={service.image}
            alt={service.desc_ar}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {service.title_ar}
        </h3>
        <p className="text-sm text-gray-600 mt-2">{service.desc_ar}</p>
        <h3 className="text-xl font-semibold text-gray-800">
          {service.title_en}
        </h3>
        <p className="text-sm text-gray-600 mt-2">{service.desc_en}</p>
        <div className="mt-4 flex justify-between">
          <EditServices servicesid={servicesid} Services={service} />
          <DeleteServices servicesid={servicesid}  id={service.id}  publicId={service?.publicId ?? ""}/>
        </div>
      </div>
    </div>
  );
};

const ServicesTable = ({ services ,servicesid }: ServicesTableProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
      {services?.map((service) => (
        <ServicesCard key={service.id} service={service} servicesid={servicesid} />
      ))}
    </div>
  );
};

export default ServicesTable;
