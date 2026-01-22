

export default function AppLogo() {
    return (
        <>
            <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg overflow-hidden bg-slate-950 shadow-sm shrink-0">
                <img src="/logo.png?v=1.3" alt="UpWearLane" className="h-8 lg:h-10 w-auto object-contain hidden dark:block" />
                <img src="/logo1.png?v=1.3" alt="UpWearLane" className="h-8 lg:h-10 w-auto object-contain block dark:hidden" />
            </div>
            <div className="grid flex-1 text-left text-sm ml-1">
                <span className="font-heading text-foreground text-xl font-bold leading-normal">
                    UpWearLane
                </span>
            </div>
        </>
    );
}
