import React from "react";
import Hero from "./Hero/Hero";
import NewCollection from "./NewCollection/NewCollection";
import Popular from "./Popular/Popular";
import ContactUs from "./ContactUs/ContactUs";

export default function Home() {
  return (
    <>
      <Hero />
      <Popular />
      <NewCollection />
      <ContactUs />
    </>
  );
}


