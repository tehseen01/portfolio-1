import { Link } from "react-router-dom";

import { About } from "../utils/interface";
import { SlideIn, Transition } from "./ui/Transitions";
import { TextReveal } from "./ui/Typography";
import { ArrowUpRight } from "./ui/Icons";

interface HeroProps {
  about: About;
}

const Hero = ({ about }: HeroProps) => {
  return (
    <section className="h-dvh w-dvw overflow-hidden relative">
      <Transition>
        <span className="blob size-1/2 absolute top-20 left-0 blur-[100px]" />
      </Transition>
      <div className="relative h-full w-full">
        <div className="flex items-center justify-center flex-col h-full pb-10">
          <Transition>
            <img
              src={about.avatar.url}
              alt={about.name}
              className="rounded-full size-28 object-cover"
            />
          </Transition>
          <div className="py-6 flex items-center flex-col">
            <h2 className="md:text-7xl text-4xl font-bold overflow-hidden">
              <SlideIn>Hello! I&apos;m {about.name}</SlideIn>
            </h2>
            <h1 className="md:text-7xl text-3xl overflow-hidden">
              <SlideIn>{about.title}</SlideIn>
            </h1>
          </div>
          <Transition viewport={{ once: true }} className="w-full">
            <p className="opacity-70 md:text-xl py-4 w-10/12 md:w-2/3 mx-auto flex flex-wrap justify-center gap-2">
              {about.subTitle.split(" ").map((word, index) => (
                <span key={index}>{word}</span>
              ))}
            </p>
          </Transition>
          <Transition viewport={{ once: true }}>
            <Link
              to={"#contact"}
              className="px-5 py-3 mt-4 rounded-full border border-white/50 flex items-center gap-2 group"
            >
              <TextReveal>Let&apos;s talk</TextReveal>
              <ArrowUpRight />
            </Link>
          </Transition>
        </div>
      </div>
    </section>
  );
};

export default Hero;
