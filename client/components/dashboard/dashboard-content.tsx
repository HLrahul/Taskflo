import Greeting from "./greeting";
import Kanban from "./kanban/kanban";
import OptionsBar from "./options-bar";
import Features from "./promo/features";

export default function DashboardContent() {
  return (
    <section className="h-[100vh] w-[80%] flex flex-col gap-5 pl-4 pr-8 py-6 bg-foreground/5">
      <Greeting />
      <Features />

      <OptionsBar />
      <Kanban />
    </section>
  );
}
