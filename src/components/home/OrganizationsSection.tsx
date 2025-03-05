
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const OrganizationsSection = () => {
  const organizations = [
    {
      name: "סודהסטרים",
      logo: "/lovable-uploads/34758b1e-cf55-46c2-9474-c10f6dbbceff.png",
    },
    {
      name: "צה״ל",
      logo: "/lovable-uploads/2be7d220-9be6-4919-827a-7a7d5f61ffd0.png",
    },
    {
      name: "אוניברסיטת חיפה",
      logo: "/lovable-uploads/dfd9084b-250e-4bb9-b0a0-c412184506b2.png",
    },
    {
      name: "האוניברסיטה הפתוחה",
      logo: "/lovable-uploads/0cb50cd7-9d54-4530-acb8-beba1a51512b.png",
    },
    {
      name: "האוניברסיטה העברית בירושלים",
      logo: "/lovable-uploads/2575eb9a-85bd-400f-810c-9356095fe2f6.png",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">ארגונים שהרצתי בהם</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            חלק מהארגונים המובילים בישראל שנהניתי להרצות ולהעביר סדנאות בהם
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center">
          {organizations.map((org, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="flex items-center justify-center p-6 h-32 w-32 md:h-36 md:w-36 bg-white hover:shadow-md transition-shadow duration-300">
                <img
                  src={org.logo}
                  alt={`לוגו ${org.name}`}
                  className="max-h-20 max-w-20 md:max-h-24 md:max-w-24 object-contain"
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizationsSection;
