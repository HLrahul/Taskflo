import SideMenuBar from "@/components/dashboard/side-menu-bar";
import RequireAuth from "@/hooks/requireAuth";

export default function dashBoard() {
    return (
        <RequireAuth>
            <section>
                <SideMenuBar />
            </section>
        </RequireAuth>
    )
}