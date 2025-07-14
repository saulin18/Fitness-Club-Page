import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center md:justify-end">
            <img
              src="/Image4.png"
              alt="Client"
              className="rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl w-full max-w-md"
            />
            <div className="absolute -bottom-4 right-8 md:right-20 bg-white dark:bg-gray-800 px-6 py-2 rounded-full shadow-md">
              <span className="text-primary dark:text-primary-dark font-bold">⭐ 5.0</span>
            </div>
          </div>

          <div className="space-y-8 relative">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary dark:text-primary-dark">
                Testimonial
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                That's What Our
                <br />
                <span className="text-primary dark:text-primary-dark">Super Client</span> Says
              </h2>
            </div>

            <Card className="p-8 relative bg-white dark:bg-gray-800 shadow-lg">
              <Quote className="w-12 h-12 text-primary/20 dark:text-primary-dark/20 absolute -top-4 left-6" />
              <p className="text-lg text-gray-600 dark:text-gray-300 italic leading-relaxed">
                "Gale is an amazing trainer as well as a great person. She is so
                flexible when it comes to my crazy work schedule and makes sure
                to always fit me in. Every day she pushes me harder towards my
                goals."
              </p>
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  Jessica Parker
                </h4>
                <p className="text-gray-500 dark:text-gray-400">Fitness Client</p>
              </div>
            </Card>

            <div className="hidden md:block absolute -right-12 top-1/2 -translate-y-1/2">
              <div className="h-24 w-24 rounded-full bg-primary/10 dark:bg-primary-dark/10 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
