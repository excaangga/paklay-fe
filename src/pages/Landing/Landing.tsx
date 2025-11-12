import Carousel from "../../components/Carousel";
import ServiceCard from "../../components/ServiceCard";
import {carouselItems} from "./carousel_items";
import {menuItems} from "./menu_items";

export default function Landing() {
  return (
    <div className="flex flex-col gap-16 mb-16">
      <Carousel items={carouselItems} /> 
      <div className="flex flex-col gap-8 px-8 md:px-16">
        <div className="text-xl font-bold">
          Paket Pelayanan Dokumen Kependudukan
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          { menuItems.map((item, index) => (
            <div key={index}>
              <ServiceCard 
                imageSrc={item.imageSrc} 
                serviceNumber={item.serviceNumber} 
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
