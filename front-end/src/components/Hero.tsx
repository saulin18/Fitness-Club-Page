import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "wouter";

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 animate-fadeIn">
            <p className="text-primary font-medium mb-4">Fitness Club</p>
            <h1 id="hero" className="text-5xl md:text-6xl font-bold mb-6 hero-text-gradient">
              Sweat, Smile
              <br />
              And Repeat
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
              A gym is a club, building, or large room, usually containing special equipment, where people go to exercise and get fit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <button className="btn-primary">
                  Join Now
                </button>
              </Link>
              <Link href="/know-more">
                <button className="btn-secondary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                  Know More
                </button>
              </Link>
            </div>
          </div>
          
          <div className={`relative z-10 animate-fadeIn ${isMobile ? 'mt-8' : ''}`}>
            <div className="relative w-full max-w-md mx-auto">
              <img
                src="/Image1.png"
                alt="Fitness"
                className="w-full h-full object-cover rounded-2xl rounded-bl-[70px] shadow-lg dark:shadow-gray-800/50"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
