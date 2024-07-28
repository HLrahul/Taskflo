import RequireAuth from "@/hooks/requireAuth";

export default function dashBoard() {
    return (
        <RequireAuth>
            <>
                Dashboard
            </>
        </RequireAuth>
    )
}