import Header from "@components/Header";
import InfoBox from "@components/InfoBox";
import shoppingSvgPath from "@assets/shopping.svg";

/**
 * Route: Landing Page
 *
 * URI: /
 *
 * @description The first page a user will see when they arrive at the site.
 *
 * @returns {React.ReactElement} Component to be rendered at the landing page route.
 */
export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="bg-[#0c2340] w-[100%] max-w-[100%] box-border h-[100%] py-16">
        <div className="grid md:grid-cols-2 gap-8 w-[100%] items-center justify-center h-[100%]">
          <div className="max-w-[70%] flex gap-3 lg:gap-8 flex-col justify-self-center">
            <h1 className="text-zinc-50 lg:text-4xl text-2xl text-center md:text-left">
              A Campus Hub For Your Personal Needs.
            </h1>
            <h2 className="md:text-left text-center text-md text-zinc-500 font-bold">
              From old furniture to used gaming systems, buy and sell goods with
              other UTSA students.
            </h2>
          </div>
          <div>
            <img src={shoppingSvgPath} alt="People shopping" />
          </div>
        </div>
      </div>
      <div className="h-[100%] flex flex-col bg-[#f9f9f9] items-center justify-evenly py-16 gap-16">
        <div className="flex flex-col items-center lg:max-w-[50%] max-w-[80%] gap-2 text-center">
          <h3 className="text-xl text-gray-500">Features</h3>
          <h1 className="text-gray-950 lg:text-3xl text-2xl">
            Support The Local UTSA Economy.
          </h1>
          <h2 className="">
            There are countless ways to buy and sell items that makes supporting
            the local campus ecosystem a breeze.
          </h2>
        </div>
        <InfoBox></InfoBox>
      </div>
    </>
  );
}
