import { Dumbbell } from "lucide-react";
import { Link } from "wouter";

const FooterSection = () => {
  return (
    <footer id="footer" className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-primary dark:text-primary-dark" />
              <span className="font-bold text-white text-lg">Fitness Club</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500">
              A Modified Fitness Club that provide fitness & nutrition related
              solutions
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">About</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary dark:hover:text-primary-dark transition">
                  Programs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary dark:hover:text-primary-dark transition">
                  Nutrition
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary dark:hover:text-primary-dark transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary dark:hover:text-primary-dark transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="hover:text-primary dark:hover:text-primary-dark transition">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary dark:hover:text-primary-dark transition">
                  Register
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary dark:hover:text-primary-dark transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary dark:hover:text-primary-dark transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Connect</h4>
            <div className="flex gap-1 items-center justify-center">
              <a href="#" className="p-2 hover:text-primary dark:hover:text-primary-dark transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  className="fill-current"
                >
                  <path d="M 8 3 C 5.2475888 3 3 5.2475888 3 8 L 3 16 C 3 18.752411 5.2475888 21 8 21 L 16 21 C 18.752411 21 21 18.752411 21 16 L 21 8 C 21 5.2475888 18.752411 3 16 3 L 8 3 z M 8 4.5 L 16 4.5 C 17.941589 4.5 19.5 6.0584112 19.5 8 L 19.5 16 C 19.5 17.941589 17.941589 19.5 16 19.5 L 8 19.5 C 6.0584112 19.5 4.5 17.941589 4.5 16 L 4.5 8 C 4.5 6.0584112 6.0584112 4.5 8 4.5 z M 17.25 6 A 0.75 0.75 0 0 0 17.25 7.5 A 0.75 0.75 0 0 0 17.25 6 z M 12 7 C 10.395834 7 9.0977407 7.6285667 8.2519531 8.5800781 C 7.4061656 9.5315896 7 10.770833 7 12 C 7 13.229167 7.4061656 14.46841 8.2519531 15.419922 C 9.0977407 16.371433 10.395834 17 12 17 C 13.604166 17 14.902259 16.371433 15.748047 15.419922 C 16.593834 14.46841 17 13.229167 17 12 C 17 10.770833 16.593834 9.5315896 15.748047 8.5800781 C 14.902259 7.6285667 13.604166 7 12 7 z M 12 8.5 C 13.229166 8.5 14.056075 8.9339333 14.626953 9.5761719 C 15.197832 10.21841 15.5 11.104167 15.5 12 C 15.5 12.895833 15.197832 13.78159 14.626953 14.423828 C 14.056075 15.066067 13.229166 15.5 12 15.5 C 10.770834 15.5 9.9439254 15.066067 9.3730469 14.423828 C 8.8021684 13.78159 8.5 12.895833 8.5 12 C 8.5 11.104167 8.8021684 10.21841 9.3730469 9.5761719 C 9.9439254 8.9339333 10.770834 8.5 12 8.5 z"></path>
                </svg>
              </a>
              <a href="#" className="p-2 hover:text-primary dark:hover:text-primary-dark transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  className="fill-current"
                >
                  <path d="M 12 2.0078125 C 6.477 2.0078125 2 6.4848125 2 12.007812 C 2 17.530812 6.477 22.007812 12 22.007812 C 17.523 22.007812 22 17.530812 22 12.007812 C 22 6.4858125 17.523 2.0078125 12 2.0078125 z M 12 3.5078125 C 16.687 3.5078125 20.5 7.3208125 20.5 12.007812 C 20.5 16.521952 16.959919 20.215392 12.511719 20.482422 L 12.511719 13.501953 L 15.251953 13.501953 A 0.750075 0.750075 0 1 0 15.251953 12.001953 L 12.511719 12.001953 L 12.511719 10.755859 C 12.511719 10.055837 13.061696 9.5058594 13.761719 9.5058594 L 15.251953 9.5058594 A 0.750075 0.750075 0 1 0 15.251953 8.0058594 L 13.761719 8.0058594 C 12.251741 8.0058594 11.011719 9.2458824 11.011719 10.755859 L 11.011719 12.001953 L 9.7519531 12.001953 A 0.750075 0.750075 0 1 0 9.7519531 13.501953 L 11.011719 13.501953 L 11.011719 20.447266 C 6.7895713 19.955191 3.5 16.359881 3.5 12.007812 C 3.5 7.3208125 7.313 3.5078125 12 3.5078125 z"></path>
                </svg>
              </a>
              <a href="#" className="p-2 hover:text-primary dark:hover:text-primary-dark transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  className="fill-current"
                >
                  <path d="M 18.492188 2.9941406 A 0.50005 0.50005 0 0 0 18.113281 3.1816406 L 13.060547 9.3164062 L 9.0566406 3.7714844 C 8.7066406 3.2874844 8.1458281 3 7.5488281 3 L 4.078125 3 C 3.420125 3 3.0388281 3.7462969 3.4238281 4.2792969 L 9.8652344 13.199219 L 4.1132812 20.181641 A 0.50090307 0.50090307 0 1 0 4.8867188 20.818359 L 10.470703 14.037109 L 14.943359 20.228516 C 15.293359 20.712516 15.854172 21 16.451172 21 L 19.921875 21 C 20.579875 21 20.961172 20.253703 20.576172 19.720703 L 13.667969 10.15625 L 18.886719 3.8183594 A 0.50005 0.50005 0 0 0 18.492188 2.9941406 z M 4.4550781 4 L 7.5507812 4 C 7.8257813 4 8.0850937 4.1324687 8.2460938 4.3554688 L 19.544922 20 L 16.451172 20 C 16.176172 20 15.916859 19.867531 15.755859 19.644531 L 4.4550781 4 z"></path>
                </svg>
              </a>
              <a href="#" className="p-2 hover:text-primary dark:hover:text-primary-dark transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  className="fill-current"
                >
                  <path d="M 12 4 C 12 4 5.7455469 3.9999687 4.1855469 4.4179688 C 3.3245469 4.6479688 2.6479687 5.3255469 2.4179688 6.1855469 C 1.9999687 7.7455469 2 12 2 12 C 2 12 1.9999687 16.254453 2.4179688 17.814453 C 2.6479687 18.675453 3.3255469 19.352031 4.1855469 19.582031 C 5.7455469 20.000031 12 20 12 20 C 12 20 18.254453 20.000031 19.814453 19.582031 C 20.674453 19.352031 21.352031 18.674453 21.582031 17.814453 C 22.000031 16.254453 22 12 22 12 C 22 12 22.000031 7.7455469 21.582031 6.1855469 C 21.352031 5.3255469 20.674453 4.6479688 19.814453 4.4179688 C 18.254453 3.9999687 12 4 12 4 z M 12 6 C 14.882 6 18.490875 6.1336094 19.296875 6.3496094 C 19.465875 6.3946094 19.604391 6.533125 19.650391 6.703125 C 19.891391 7.601125 20 10.342 20 12 C 20 13.658 19.891391 16.397875 19.650391 17.296875 C 19.605391 17.465875 19.466875 17.604391 19.296875 17.650391 C 18.491875 17.866391 14.882 18 12 18 C 9.119 18 5.510125 17.866391 4.703125 17.650391 C 4.534125 17.605391 4.3956094 17.466875 4.3496094 17.296875 C 4.1086094 16.398875 4 13.658 4 12 C 4 10.342 4.1086094 7.6011719 4.3496094 6.7011719 C 4.3946094 6.5331719 4.533125 6.3946094 4.703125 6.3496094 C 5.508125 6.1336094 9.118 6 12 6 z M 10 8.5351562 L 10 15.464844 L 16 12 L 10 8.5351562 z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-800 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>© 2024 Fitness Club. All rights reserved</p>
        </div>
      </main>
    </footer>
  );
};

export default FooterSection;
