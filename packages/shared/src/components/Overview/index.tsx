import { SidebarItem } from "@fibr/builder";
import type { ThreadWithIdType } from "@fibr/react";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { DndWrapper, Empty } from "../utils";
import { OverviewCard } from "./OverviewCard";

export type Overview = {
  blocks: ThreadWithIdType[];
} & Pick<OverviewCard, "selectBlock" | "removeBlock"> & {
    moveBlock: (startBlockId: string, endblockId: string) => void;
    active: {
      form: string | null;
      block: string | null;
    };
  };

export function Overview(props: Overview) {
  return (
    <SidebarItem
      name="overview"
      label="Overview"
      icon={<ListBulletIcon className="h-5 w-5 stroke-2" />}
      className="flex-col overflow-hidden overflow-y-auto data-[state=active]:flex data-[orientation=vertical]:p-0"
    >
      <div className="sticky top-0 z-10 space-y-3 bg-white p-3">
        <h4 className="font-medium">Overview</h4>
        <hr />
      </div>
      <FieldsRender {...props} />
    </SidebarItem>
  );
}

function FieldsRender(props: Overview) {
  if (!props.active.form)
    return (
      <Empty
        title="No Form"
        description="You can go to forms tab to add form"
      />
    );

  if (props.blocks.length === 0)
    return (
      <Empty
        title="No Field"
        description="You can go to palette to add field"
      />
    );

  return (
    <div className="space-y-2.5 px-3 pb-3">
      <DndWrapper
        items={props.blocks.map(({ id }) => id)}
        onDragStart={({ active }) => props.selectBlock(String(active.id))}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id)
            props.moveBlock(String(active.id), String(over.id));
        }}
      >
        {props.blocks.map(({ id, type }) => (
          <OverviewCard
            key={id}
            id={id}
            type={type}
            selectBlock={props.selectBlock}
            removeBlock={props.removeBlock}
            isActive={props.active.block === id}
          />
        ))}
      </DndWrapper>
    </div>
  );
}
