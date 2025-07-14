const trainers = [
  {
    name: 'Jason Holder',
    role: 'Fitness Expert'
  },
  {
    name: 'Sarah Johnson',
    role: 'Yoga Instructor'
  },
  {
    name: 'Michael Brown',
    role: 'Nutrition Coach'
  }
]

const Trainers = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div id="training" className="text-center mb-12">
          <p className="text-primary dark:text-primary-dark font-medium mb-4">Our Instructors</p>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Meet Our Extremely
            <br />
            Talented Trainers
          </h2>
        </div>

        <div className="grid mx-auto place-content-center grid-cols-1 gap-8">
          <img
            className="mx-auto rounded-2xl dark:shadow-gray-800/50"
            src="/Image3.png"
            alt="Our Trainers"
          />
          <ul className="grid grid-cols-3 lg:grid-cols-3 md:px-0 lg:px-[4rem] xl:px-[8rem] mb-20 ">
            {trainers.map((trainer, index) => (
              <li
                key={index}
                className="flex flex-col mt-6 items-center text-gray-900 dark:text-white"
              >
                <span className="font-semibold">{trainer.name}</span>
                <span className="text-gray-600 dark:text-gray-300">{trainer.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Trainers
