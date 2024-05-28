import BuilderPlaceholder from "./ui/builder_placeholder";
import OverviewPlaceholder from "./ui/overview_placeholder";

export default async function FileSkeleton(){
return (
    <div className="col-span-3 grid grid-cols-3">
        <BuilderPlaceholder/>
        <OverviewPlaceholder/>
    </div>
)
}

