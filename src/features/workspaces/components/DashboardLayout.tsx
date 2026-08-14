

export default function DashboardLayout() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* 
        BENTO GRID CONTAINER
        - Uses auto-rows for consistent vertical sizing
        - gap-6 keeps the space between cards rigid
      */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-6">
        
        {/* HEADER / WELCOME BLOCK: Spans full width on mobile, 3 columns on desktop */}
        <div className="bg-surface rounded-bento border border-border p-8 md:col-span-3 flex flex-col justify-center shadow-sm">
          <h1 className="text-3xl font-bold">Welcome back, Team!</h1>
          <p className="text-muted mt-2">Here is what is happening in your workspace today.</p>
        </div>

        {/* PROFILE / QUICK ACTION BLOCK: 1 column */}
        <div className="bg-primary rounded-bento text-white p-8 md:col-span-1 flex flex-col justify-between shadow-sm">
          <div className="font-semibold tracking-wide uppercase text-sm">Quick Action</div>
          <button className="w-full bg-white text-primary font-medium py-3 rounded-xl mt-4 hover:bg-opacity-90 transition">
            + New Task
          </button>
        </div>

        {/* KANBAN PREVIEW: Spans 2 columns, tall (2 rows) */}
        <div className="bg-surface rounded-bento border border-border p-6 md:col-span-2 md:row-span-2 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Urgent Tasks</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-base border border-border flex justify-between items-center">
                <span className="font-medium">Complete API endpoints</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">High</span>
              </div>
            ))}
          </div>
        </div>

        {/* STATS BLOCK: 1 column, standard height */}
        <div className="bg-surface rounded-bento border border-border p-6 md:col-span-1 shadow-sm flex flex-col items-center justify-center">
          <div className="text-5xl font-black text-primary">12</div>
          <div className="text-muted mt-2 font-medium">Active Projects</div>
        </div>

        {/* RECENT ACTIVITY: 1 column, standard height */}
        <div className="bg-surface rounded-bento border border-border p-6 md:col-span-1 shadow-sm">
          <h2 className="text-lg font-bold mb-2">Activity</h2>
          <div className="text-sm text-muted">Alex moved "Design UI" to Done.</div>
        </div>
      </div>
    </div>
  );
}