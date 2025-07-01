import { Mail, Dumbbell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SubscribeSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/10 to-white dark:from-primary-dark/10 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="space-y-6 mb-12">
            <Dumbbell className="w-12 h-12 text-primary dark:text-primary-dark mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Subscribe Our Fitness Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
              Physical activity is defined as any bodily movement produced by
              skeletal muscles that results in energy expenditure
            </p>
          </div>

          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Type Your Email Address"
                className="pl-10 py-6 text-base bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <Button className="py-6 px-8 text-base bg-primary dark:bg-primary-dark hover:bg-primary/90 dark:hover:bg-primary-dark/90 text-white">
              Subscribe
            </Button>
          </form>

          <div className="absolute left-4 top-8 -rotate-12 text-primary/10 dark:text-primary-dark/10 font-bold text-2xl">
            G3 3 x279
          </div>
          <div className="absolute right-8 bottom-12 text-primary/5 dark:text-primary-dark/5 font-black text-4xl">
            FITNESS
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;