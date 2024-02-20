import { useCanvas } from "@fibr/providers";
import { Canvas, WorkflowControls } from "@fibr/shared";
import { Diagram } from "./Diagram";
import { useDroppable } from "@dnd-kit/core";
import { FormProvider, useForm } from "react-hook-form";
import { WeaverProvider } from "@fibr/react";
import { NodeWrapper } from "./NodeWrapper";

export function PageCanvas() {
  const methods = useForm();
  const select = useCanvas(({ select }) => select);
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <FormProvider {...methods}>
      <Canvas ref={setNodeRef} onClick={() => select({ blockId: null })}>
        <div className="flex h-full w-full bg-white">
          <WeaverProvider wrapper={NodeWrapper}>
            <Diagram />
          </WeaverProvider>
        </div>
        <WorkflowControls />
      </Canvas>
    </FormProvider>
  );
}
