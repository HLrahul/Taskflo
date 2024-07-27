import AuthCard from "@/components/auth-card";

export default function Home() {
  return (
    <div className="min-h-[100vh] w-[100%] m-auto bg-gradient-to-b from-white to-[#AFA3FF]">
      <div className="max-w-[1400px] m-auto">
        <section className="h-[65vh] w-full flex items-center justify-center">
          <AuthCard type="login" />
        </section>
      </div>
    </div>
  );
}
