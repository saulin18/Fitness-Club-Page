import { Link } from "wouter";
import { Dumbbell, Users, Clock, Award } from "lucide-react";

const KnowMore = () => {
  const features = [
    {
      icon: <Dumbbell className="w-8 h-8 text-primary" />,
      title: "State-of-the-art Equipment",
      description: "Access to the latest fitness equipment and technology to help you achieve your goals."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Expert Trainers",
      description: "Our certified trainers are here to guide you through your fitness journey with personalized attention."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Flexible Hours",
      description: "Open 24/7 to accommodate your schedule, making it easier to maintain your fitness routine."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Proven Results",
      description: "Join thousands of members who have achieved their fitness goals with our programs."
    }
  ];

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Why Choose Fitness Club?
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're more than just a gym - we're a community dedicated to helping you achieve your fitness goals
            through personalized training, modern equipment, and a supportive environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/register">
            <button className="btn-primary">
              Join Now
            </button>
          </Link>
          <Link href="/" className="block mt-4 text-primary hover:text-primary-dark">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KnowMore; 