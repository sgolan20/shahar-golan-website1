
import StatNumber from "./StatNumber";

const StatsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatNumber value="6000" label="מנויים בערוץ היוטיוב" />
          <StatNumber value="150" label="הרצאות וסדנאות" />
          <StatNumber value="1000" label="צפיות יומיות" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
