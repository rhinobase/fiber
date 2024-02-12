import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";
import { useFormBuilder } from "@fibr/providers";
import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { classNames } from "@rafty/ui";
import { cva } from "class-variance-authority";
import {
  type CSSProperties,
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
} from "react";
import { QuickActions } from "./QuickActions";

const wrapperClasses = cva("w-full cursor-pointer border bg-white rounded", {
  variants: {
    selected: {
      true: "border-primary-500",
      false: "border-transparent",
    },
  },
});

export function FieldWrapper({ children }: PropsWithChildren) {
  const { id, type } = useThread();
  const { activeBlock, select } = useFormBuilder(({ block, active }) => ({
    select: block.select,
    activeBlock: active.block,
  }));

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const onSelect = eventHandler(() => select(id));

  if (type === "canvas")
    return (
      <Wrapper
        selected={activeBlock === id}
        className="p-6"
        onClick={onSelect}
        onKeyDown={onSelect}
      >
        {children}
      </Wrapper>
    );

  const _transform: Transform = {
    x: transform?.x ?? 0,
    y: transform?.y ?? 0,
    scaleX: 1,
    scaleY: 1,
  };

  const nodeStyle: CSSProperties = {
    transform: CSS.Transform.toString(_transform),
    transition,
  };

  return (
    <QuickActions>
      <Wrapper
        selected={activeBlock === id}
        ref={setNodeRef}
        style={nodeStyle}
        {...attributes}
        {...listeners}
        className={classNames(
          "select-none p-4 hover:shadow-md",
          !isDragging && "transition-all ease-in-out",
        )}
      >
        {children}
      </Wrapper>
    </QuickActions>
  );
}

type WrapperProps = HTMLAttributes<HTMLDivElement> & {
  selected: boolean;
};

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(
  ({ className, selected, ...props }, forwardedRef) => (
    <div
      {...props}
      className={classNames(wrapperClasses({ selected }), className)}
      ref={forwardedRef}
    />
  ),
);
