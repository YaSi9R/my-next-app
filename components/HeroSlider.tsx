import { Award, Zap, Users, CheckCircle2, ArrowRight, Shield, ZapIcon } from 'lucide-react'
import Link from 'next/link';
import Image from "next/image";
import image1 from "../public/image1 (3).png";
import machine from "../public/image copy1.png";


export function HeroSlider() {
  return (
    <section className="relative overflow-hidden bg-[#e6e6e6]  pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Decorative background elements */}
      {/* <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <Image
          src={image1}
          alt="Contact Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#e6e6e6]/80 backdrop-blur-[2px]" />
      </div> */}

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-3">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-[#022c75] border border-accent/30">
              <div className="h-2 w-2 rounded-full bg-[#e6e6e6] animate-pulse"></div>
              <span className="text-sm font-semibold text-[#e6e6e6]">Tekmart India Exim Pvt. Ltd.</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-[#022c75] leading-tight tracking-tight">
                Your Trusted Partner for SMT & PCB <br /> <span className="text-[#022c75] text-3xl">Manufacturing Solutions</span>
              </h1>
              <p className="text-md md:text-md text-[#022c75] leading-relaxed max-w-xl">
                We specialize in supplying used and refurbished SMT machines, new spare parts, and board handling equipment with comprehensive after-sales support for EMS and OEM manufacturers across India.
              </p>
            </div>

            {/* Trust Badges - Extracted Insights */}
            <div className="space-y-1 ">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#022c75] flex items-center justify-center">
                  <CheckCircle2 className="h-3 w-3 text-[#e6e6e6]" />
                </div>
                <span className="text-[#022c75]/90 font-medium">Build & Expand Production Lines</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#022c75] flex items-center justify-center">
                  <CheckCircle2 className="h-3 w-3 text-[#e6e6e6]" />
                </div>
                <span className="text-[#022c75]/90 font-medium">Complete Equipment & Parts Solutions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#022c75] flex items-center justify-center">
                  <CheckCircle2 className="h-3 w-3 text-[#e6e6e6]" />
                </div>
                <span className="text-[#022c75]/90 font-medium">Technical Expertise & Dependable Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2 ">

              {/* Primary button */}
              <Link
                href="/contact"
                className="bg-[#022c75] hover:bg-[#022c75]/90
               text-[#e6e6e6] font-semibold
               px-4 py-2
               rounded-lg shadow-lg hover:shadow-xl
               transition-all flex items-center gap-2"
              >
                Get Free Consultation
                <ArrowRight className="h-2 w-5 text-8xl" />
              </Link>

              {/* Secondary button */}
              <Link
                href="/solutions"
                className="bg-[#022c75] hover:bg-[#022c75]/85
               text-[#e6e6e6]
               border border-[#022c75]/40
               font-bold px-8 py-4
               rounded-lg transition-all"
              >
                View Solutions
              </Link>

            </div>



            {/* Trust Indicator */}
            <div className="text-[#022c75] text-sm font-medium pt-4">
              ✓ No hidden costs  •  ✓ Free consultation  •  ✓ Instant quote
            </div>
          </div>

          {/* Right Side - Creative Card Layout */}
          <div className="relative h-full  lg:flex items-center ">
            <div className="relative w-full max-w-md lg:ml-12">
              <Image
                src={machine}
                alt="SMT & PCB Manufacturing Equipment"
                width={500}
                height={600}
                priority
                className="object-contain"
              />
            </div>
            </div>
        </div>

      </div>

    </section >
  )
}
