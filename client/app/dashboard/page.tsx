import RequireAuth from "@/hooks/requireAuth";

import SideMenuBar from "@/components/dashboard/side-menu-bar";
import DashboardContent from "@/components/dashboard/dashboard-content";
import { TasksProvider } from "../store/tasksContext";

export default function DashBoard() {
    return (
      <RequireAuth>
        <TasksProvider>
          <section className="flex overflow-hidden">
            <SideMenuBar />
            <DashboardContent />
          </section>
        </TasksProvider>
      </RequireAuth>
    );
}