import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { About, Problem } from '../components/Intro'
import { Services } from '../components/Services'
import { Digital } from '../components/Digital'
import { Results } from '../components/Results'
import { Simulator } from '../components/Simulator'
import { Team } from '../components/Team'
import { Process } from '../components/Process'
import { Plans } from '../components/Plans'
import { Feedback } from '../components/Feedback'
import { Faq } from '../components/Faq'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <About />
        <Services />
        <Digital />
        <Results />
        <Simulator />
        <Team />
        <Process />
        <Plans />
        <Faq />
        <Feedback />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
