import { NavigationWithContent } from "@src/Navigation";
import USPCTASection from "@src/LandingPage/CTABlock";
import InfoBlocks from "@src/LandingPage/InfoBlocks";

const uniCtaBlocks = [
  {
    symbol: "🎓",
    headline: "Empower Your University",
    text: "Discover how LearnGraph transforms higher education through personalized learning containers, AI-driven peer coaching, and innovative support structures.",
    cta: "Contact Us for a Demo",
    onClick: () => (window.location.href = "/contact"),
  },
  {
    symbol: "📈",
    headline: "Drive Retention and Growth",
    text: "Our platform has helped universities reduce dropout by 20% and retain up to 95% of net tuition revenue.",
    cta: "See Success Stories",
    onClick: () => (window.location.href = "/success-stories"),
  },
];

const uniInfoBlocks = [
  {
    target: "Learning Innovation",
    headline: "Revolutionize the Learning Experience",
    imageUrl: "/assets/university-product.png", // update with your actual asset path
    keywords: [
      "Adaptive Learning",
      "Learning Containers",
      "Peer Coaching",
      "Data-Driven Insights",
      "Engagement",
    ],
  },
  {
    target: "Strategic Outcomes",
    headline: "Proven Results for Institutions",
    imageUrl: "/assets/university-outcomes.png",
    keywords: [
      "20% Reduced Dropout",
      "95% Tuition Retention",
      "Scalable Implementation",
      "Enhanced Student Success",
    ],
  },
];

const uniSuccessStories = [
  {
    title: "Erasmus Consortium Success",
    description:
      "Our collaboration with the Erasmus Consortium has transformed the student experience across multiple European universities, driving higher retention and engagement.",
    imageUrl: "/assets/erasmus-success.png",
  },
  {
    title: "Leading University Spotlight",
    description:
      "A renowned institution saw a dramatic decrease in dropout rates after implementing our tailored solutions, paving the way for scalable growth.",
    imageUrl: "/assets/partner-uni.png",
  },
];

export const CGUniversity = () => {
  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/LGBG2.png')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <NavigationWithContent
        content={
          <>
            {/* Hero Section */}
            <section className="py-12 mt-8 bg-gray-900/60 text-white text-center">
              <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Transforming Higher Education with LearnGraph
                </h1>
                <p className="text-xl mb-8">
                  Empower your institution with our cutting-edge platform built
                  for modern learning, adaptive coaching, and measurable
                  success.
                </p>
                <img
                  src="/assets/university-hero.png"
                  alt="LearnGraph for Universities"
                  className="mx-auto my-8 rounded-lg shadow-lg max-w-full"
                />
              </div>
            </section>

            {/* Info Blocks Section using the dedicated component */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <InfoBlocks blocks={uniInfoBlocks} headline="What We Offer" />
              </div>
            </section>

            {/* CTABlocks Section using the dedicated component */}
            <section className="py-12">
              <h2>Partner With Us</h2>
              <div className="container mx-auto px-4">
                <USPCTASection blocks={uniCtaBlocks} />
              </div>
            </section>

            {/* Success Stories Section */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center p-4 mb-8 bg-white/70 rounded-2xl">
                  Success Stories
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {uniSuccessStories.map((story, index) => (
                    <div
                      key={index}
                      className="bg-gray-100/90 p-6 rounded-lg shadow-md"
                    >
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full mb-4 rounded"
                      />
                      <h3 className="text-xl font-semibold mb-2">
                        {story.title}
                      </h3>
                      <p>{story.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Outcomes Section */}
            <section className="py-12 text-white">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">University Outcomes</h2>
                <p className="text-xl mb-2">
                  Our tailored solutions have reduced dropout rates by{" "}
                  <span className="font-bold">20%</span>
                </p>
                <p className="text-xl mb-2">
                  And helped institutions retain{" "}
                  <span className="font-bold">95%</span> of net tuition revenue.
                </p>
                <p className="text-lg">
                  Learn more about how our platform delivers measurable success
                  through innovative learning containers and peer coaching.
                </p>
              </div>
            </section>
          </>
        }
      />
    </div>
  );
};
