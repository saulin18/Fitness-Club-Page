import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: "🧘‍♀️",
    title: "Meditation Programme",
    description: "Find your inner peace"
  },
  {
    icon: "💪",
    title: "Muscle Building",
    description: "Build your strength"
  },
  {
    icon: "🏃",
    title: "Cardio Programme",
    description: "Improve your endurance"
  },
  {
    icon: "🥗",
    title: "Nutrition Supports",
    description: "Eat healthy, live better"
  }
];

const Services = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Services</h2>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
            Awesome Packages That We<br />Offer For Our Clients
          </p>
        </div>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, index) => (
            <Card key={index} className="bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-gray-800/50 transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </main>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-20 h-20 bg-yellow-100 dark:bg-yellow-dark-100 rounded-full opacity-50" />
            <img
              src="/Image.png"
              alt="Woman exercising"
              className="relative z-10 rounded-2xl rounded-br-[85px] w-full shadow-lg dark:shadow-gray-800/50"
            />
          </div>
          <div>
            <span className="text-primary dark:text-primary-dark font-medium mb-4 block">Health Benefits</span>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Physical Exercise Gives<br />Your Body The Wings
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Physical activity and exercise can have immediate and long-term health benefits. Most importantly, regular activity can improve your quality of life. Exercise can improve your health and reduce the risk of developing several diseases.
            </p>
            <button className="btn-primary">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
