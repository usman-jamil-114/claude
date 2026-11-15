"use client";
import { Comparison } from "../sections/Comparison";
import { FAQ } from "../sections/FAQ";
import { FinalCTA } from "../sections/FinalCTA";
import { Hero } from "../sections/Hero";
import { OfferSpots } from "../sections/OfferSpots";
import { Pricing } from "../sections/Pricing";
import { Process } from "../sections/Process";
import { ServicesOverview } from "../sections/ServicesOverview";
import { TechMarquee } from "../sections/TechMarquee";
import { WhyUs } from "../sections/WhyUs";

export function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <OfferSpots />
      <ServicesOverview />
      <WhyUs />
      <Pricing />
      <Process />
      <Comparison />
      <FAQ />
      <FinalCTA />
    </>
  );
}
