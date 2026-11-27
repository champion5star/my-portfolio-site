import HeroSection from '../components/sections/HeroSection';
import TechStrip from '../components/sections/TechStrip';
import SelectedWorkSection from '../components/sections/SelectedWorkSection';
import ApproachSection from '../components/sections/ApproachSection';
import ContactBanner from '../components/sections/ContactBanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechStrip />
      <SelectedWorkSection />
      <ApproachSection />
      <ContactBanner />
    </>
  );
}
