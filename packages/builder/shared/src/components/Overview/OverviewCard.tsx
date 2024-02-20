import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockWithIdType, useCanvas } from "@fibr/providers";
import { eventHandler } from "@rafty/shared";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Text,
  accordionTriggerClasses,
  buttonClasses,
  classNames,
} from "@rafty/ui";
import { cva } from "class-variance-authority";
import { HTMLAttributes, type CSSProperties } from "react";
import { HiChevronRight } from "react-icons/hi";
import { MdDelete, MdDragIndicator } from "react-icons/md";

const cardClasses = cva(
  "dark:bg-secondary-900 border bg-transparent bg-white p-2 transition-none dark:bg-transparent",
  {
    variants: {
      selected: {
        true: "border-primary-500",
        false: "border-secondary-300 dark:border-secondary-700",
      },
    },
  },
);

export type OverviewCard = {
  id: string;
  type: string;
  groups?: Record<string, BlockWithIdType[] | undefined>;
  onToggle?: (value: string) => void;
};

export function OverviewCard({ id, type, groups, onToggle }: OverviewCard) {
  const { active, select, remove } = useCanvas(
    ({ select, remove, active }) => ({
      active,
      select,
      remove,
    }),
  );

  const hasChildren = groups ? id in groups : false;

  const { setNodeRef, transform, transition, attributes, listeners } =
    useSortable({ id, data: { type } });

  const nodeStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleNodeSelect = eventHandler(() => select({ blockId: id }));

  const handleNodeDelete = eventHandler(() => remove({ blockId: id }));

  const handleToggleCollapse = eventHandler(() => onToggle?.(id));

  // TODO: this is not working
  // if (isDragging) return <div className="bg-primary-500 h-1 w-full" />;

  const CardRender = () => (
    <>
      <DragHandler {...attributes} {...listeners} />
      {hasChildren && (
        <CollapseButton
          onClick={handleToggleCollapse}
          onKeyDown={handleToggleCollapse}
        />
      )}
      <span className="text-2xs flex gap-1 truncate font-medium">
        {id}
        <Text isMuted className="italic">
          ({type})
        </Text>
      </span>
      <div className="flex-1" />
      <DeleteButton onClick={handleNodeDelete} onKeyDown={handleNodeDelete} />
    </>
  );

  if (hasChildren)
    return (
      <AccordionItem value={id}>
        <AccordionTrigger
          className={cardClasses({ selected: active.includes(id) })}
          showIcon={false}
          style={nodeStyle}
          ref={setNodeRef}
          onClick={handleNodeSelect}
          onKeyDown={handleNodeSelect}
        >
          <CardRender />
        </AccordionTrigger>
        <AccordionContent className="h-full overflow-visible px-0 pl-4">
          {groups?.[id]?.map((block) => (
            <OverviewCard
              key={block.id}
              {...block}
              groups={groups}
              onToggle={onToggle}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    );

  return (
    <div
      ref={setNodeRef}
      style={nodeStyle}
      className={classNames(
        accordionTriggerClasses(),
        cardClasses({ selected: active.includes(id) }),
      )}
      onClick={handleNodeSelect}
      onKeyDown={handleNodeSelect}
    >
      <CardRender />
    </div>
  );
}

type CollapseButton = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

function CollapseButton({ className, ...props }: CollapseButton) {
  return (
    <span
      {...props}
      className={classNames(
        buttonClasses({ size: "icon", variant: "ghost" }),
        "rounded px-0.5 py-1",
        className,
      )}
    >
      <HiChevronRight className="text-secondary-500 transition-transform group-data-[state=open]:rotate-90" />
    </span>
  );
}

type DragHandler = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  isDragging?: boolean;
};

function DragHandler({ className, isDragging, ...props }: DragHandler) {
  return (
    <span
      {...props}
      className={classNames(
        buttonClasses({ size: "icon", variant: "ghost" }),
        "rounded px-0.5 py-1",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      )}
    >
      <MdDragIndicator className="text-black" />
    </span>
  );
}

type DeleteButton = HTMLAttributes<HTMLSpanElement>;

function DeleteButton({ className, ...props }: DeleteButton) {
  return (
    <span
      {...props}
      className={classNames(
        buttonClasses({ size: "icon", variant: "ghost" }),
        "cursor-pointer rounded p-0.5",
        className,
      )}
    >
      <MdDelete />
    </span>
  );
}
