import RequireAuth from "@/hooks/requireAuth";

import SideMenuBar from "@/components/dashboard/side-menu-bar";
import DashboardContent from "@/components/dashboard/dashboard-content";

export default function DashBoard() {
    return (
        <RequireAuth>
            <section className="flex">
                <SideMenuBar />
                <DashboardContent />
            </section>
        </RequireAuth>
    )
}