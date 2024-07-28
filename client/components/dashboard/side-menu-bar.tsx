import Profile from "./profile";

export default function SideMenuBar () {
    return (
        <section className="w-[20%] h-[100vh] px-4 py-6 flex flex-col justify-start border-r-[1px] border-foreground/5">
            <Profile />
        </section>
    )
}