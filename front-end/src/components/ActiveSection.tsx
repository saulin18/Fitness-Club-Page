import React from "react";

const ActiveSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-primary dark:text-primary-dark font-medium">Improve Moods</p>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Makes You More Active<br />And Improve Moods
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Physical activity and exercise can have immediate and long-term health benefits. Most importantly, regular activity can improve your quality of life. Exercise can improve your health and reduce the risk of developing several diseases.
            </p>
            <button className="btn-primary">
              Learn more
            </button>
          </div>
          <div className="relative">
            <img
              src="/Image2.png"
              alt="Active person exercising"
              className="w-full rounded-2xl rounded-tl-[70px] shadow-lg dark:shadow-gray-800/50"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-100 dark:bg-yellow-dark-100 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActiveSection;
