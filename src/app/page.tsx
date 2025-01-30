import React from "react";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing-page/Hero";
import Footer from "@/components/layout/Footer";
import Akademik from "@/components/landing-page/Akademik";
import Galeri from "@/components/landing-page/Galeri";
import Kepengurusan from "@/components/landing-page/Kepengurusan";
import Visi from "@/components/landing-page/Visi";
import Fotbar from "@/components/landing-page/Fotbar";
import TentangKami from "@/components/landing-page/TentangKami";
import Logo from "@/components/landing-page/Logo";
import Postingan from "@/components/landing-page/Postingan";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <div>
        <Hero />
        <Postingan />
        <div>
          <Logo />
          <TentangKami />
          <Fotbar />
          <Visi />
        </div>
        <Kepengurusan />
        <Galeri />
        <Akademik />
      </div>
      <Footer />
    </main>
  );
}
