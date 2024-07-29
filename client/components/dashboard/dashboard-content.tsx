import Features from "./features";
import Greeting from "./greeting";
import OptionsBar from "./options-bar";

export default function DashboardContent () {
    return (
      <section className="h-[100vh] w-[80%] flex flex-col gap-5 pl-4 pr-8 py-6 bg-foreground/5">
        <Greeting />
        <Features />

        <OptionsBar />
      </section>
    );
}