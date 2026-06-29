import type { TopGroup, SubFilter } from "@/lib/activities";
import { SectionHeading } from "./SectionHeading";
import { ActivityBoard } from "./ActivityBoard";

export function Activities({
  tops,
  subFilters,
}: {
  tops: TopGroup[];
  subFilters: SubFilter[];
}) {
  return (
    <section id="activities" className="scroll-mt-20 border-t border-border py-14">
      <SectionHeading>活動 / Activities</SectionHeading>
      <ActivityBoard tops={tops} subFilters={subFilters} />
    </section>
  );
}
