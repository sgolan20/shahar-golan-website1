import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const OrganizationsSection = () => {
  const organizations = [{
    name: "סודהסטרים",
    logo: "/lovable-uploads/34758b1e-cf55-46c2-9474-c10f6dbbceff.png"
  }, {
    name: "צה״ל",
    logo: "/lovable-uploads/2be7d220-9be6-4919-827a-7a7d5f61ffd0.png"
  }, {
    name: "אוניברסיטת חיפה",
    logo: "/lovable-uploads/dfd9084b-250e-4bb9-b0a0-c412184506b2.png"
  }, {
    name: "חשיפה",
    logo: "/lovable-uploads/f5c1b97f-470f-419a-8100-660bfded6922.png"
  }, {
    name: "האוניברסיטה העברית בירושלים",
    logo: "/lovable-uploads/2575eb9a-85bd-400f-810c-9356095fe2f6.png"
  }, {
    name: "הטכניון מכון טכנולוגי לישראל",
    logo: "/lovable-uploads/ef9f5456-d3a1-4689-beda-0620c91e21f1.png"
  }, {
    name: "יקב טפרברג",
    logo: "/lovable-uploads/7402b778-1c4a-408a-9865-5614d70292f6.png"
  }, {
    name: "התעשייה האווירית",
    logo: "/lovable-uploads/33777d11-e7bd-4dd2-b576-92b13e179bab.png"
  }, {
    name: "אמית",
    logo: "/lovable-uploads/1db7290b-8d99-4c5c-8de5-8509e53bb531.png"
  }, {
    name: "המרכז האקדמי פרס",
    logo: "/lovable-uploads/fd9606b2-7d21-4add-a303-aca7ac8e6fe1.png"
  }, {
    name: "אמונה",
    logo: "/lovable-uploads/9518f027-9c20-4f37-a5f2-eece147e3ad1.png"
  }, {
    name: "המרכז האקדמי הרב תחומי ירושלים",
    logo: "/lovable-uploads/de7e2267-cc70-4a7d-9c8e-047faa05ed67.png"
  }, {
    name: "עיריית תל אביב-יפו",
    logo: "/lovable-uploads/b83c5736-541f-4bbb-87e2-a2690c78c276.png"
  }, {
    name: "ערוץ 7",
    logo: "/lovable-uploads/CHANNEL7.jpg"
  }, {
    name: "אקט",
    logo: "/lovable-uploads/אקט.png"
  }, {
    name: "הבט",
    logo: "/lovable-uploads/Hebet.png"
  }];
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">הם כבר מכירים אותי</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            חלק מהארגונים המובילים בישראל שנהניתי להרצות ולהעביר סדנאות בהם
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center">
          {organizations.map((org, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} viewport={{
          once: true
        }}>
              <Card className="flex items-center justify-center p-6 h-40 w-40 md:h-48 md:w-48 bg-white hover:shadow-md transition-shadow duration-300">
                <img src={org.logo} alt={`לוגו ${org.name}`} className="max-h-28 max-w-28 md:max-h-36 md:max-w-36 object-contain" />
              </Card>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default OrganizationsSection;