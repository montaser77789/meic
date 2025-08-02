import { Equipment, Service } from "@prisma/client";
import Image from "next/image";
import EditEquipment from "./EditEquipment";
import DeleteEquipment from "./DeleteEquipment";

interface ServicesTableProps {
  equipments: Equipment[];
  equipmentsCatagoryid: string;
}

const EquipmentCard = ({
  equipment,
  equipmentsid,
}: {
  equipment: Equipment;
  equipmentsid: string;
}) => {
  return (
    <div className="w-full  bg-white rounded-lg shadow-lg overflow-hidden mt-12">
      <div className="relative w-full h-56">
        {equipment?.image && equipment.image.startsWith("http") && (
          <Image
            src={equipment.image}
            alt={equipment.description_ar}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {equipment.title_ar}
        </h3>
        <p className="text-sm text-gray-600 mt-2">{equipment.description_ar}</p>
        <h3 className="text-xl font-semibold text-gray-800">
          {equipment.title_en}
        </h3>
        <p className="text-sm text-gray-600 mt-2">{equipment.description_en}</p>
        <div className="mt-4 flex justify-between">
          <EditEquipment equipmentsid={equipmentsid} Equipment={equipment} />
          <DeleteEquipment
            equipmentsCatagoryid={equipmentsid}
            id={equipment.id}
            publicId={equipment?.publicId ?? ""}
          />
        </div>
      </div>
    </div>
  );
};

const EquipmentTableAdmin = ({
  equipments,
  equipmentsCatagoryid: equipmentsid,
}: ServicesTableProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
      {equipments?.map((service) => (
        <EquipmentCard
          key={service.id}
          equipment={service}
          equipmentsid={equipmentsid}
        />
      ))}
    </div>
  );
};

export default EquipmentTableAdmin;
