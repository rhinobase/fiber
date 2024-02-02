import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ThreadWithIdType } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { Button, classNames } from "@rafty/ui";
import { CSSProperties } from "react";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { useBlueprint } from "../providers";

export type OverviewCard = ThreadWithIdType & {
  icon: JSX.Element;
};

export function OverviewCard({ id, type }: ThreadWithIdType) {
  const {
    blocks: { select },
    active,
  } = useBlueprint();
  const { setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const nodeStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const selectBlock = eventHandler(() => select(id));

  return (
    <div
      ref={setNodeRef}
      style={nodeStyle}
      className={classNames(
        "dark:bg-secondary-900 flex cursor-pointer select-none items-center gap-1 rounded-md border bg-white p-2 drop-shadow hover:drop-shadow-md",
        !isDragging && "transition-all ease-in-out",
        active.block === id
          ? "border-primary-500"
          : "border-secondary-300 dark:border-secondary-700",
      )}
      onClick={selectBlock}
      onKeyDown={selectBlock}
    >
      <DragHandler id={id} />
      <p className="text-2xs truncate font-medium capitalize">{`${id} (${type})`}</p>
      <div className="flex-1" />
      <DeleteButton id={id} />
    </div>
  );
}

type DragHandler = {
  id: string;
};

function DragHandler({ id }: DragHandler) {
  const { attributes, listeners, isDragging } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className={classNames(
        "rounded px-0.5 py-1",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      )}
    >
      <MdDragIndicator className="text-black" />
    </Button>
  );
}

type DeleteButton = {
  id: string;
};

function DeleteButton({ id }: DeleteButton) {
  const {
    blocks: { remove },
    active,
  } = useBlueprint();

  const formId = active.form;

  if (!formId) throw new Error("Unable to find an active form!");

  const deleteNode = eventHandler(() => remove(formId, id));

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      className="rounded p-0.5"
      onClick={deleteNode}
      onKeyDown={deleteNode}
    >
      <MdDelete />
    </Button>
  );
}
