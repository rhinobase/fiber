import { Sidebar as BuilderSidebar } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import {
  CodeGenerator,
  InspectorPanel,
  Overview,
  Palette,
  astResolver,
} from "@fibr/shared";

export function Sidebar() {
  const { add, all, active, select, remove, move } = useCanvas(
    ({ add, all, select, remove, move, active }) => ({
      active,
      add,
      all,
      select,
      remove,
      move,
    }),
  );

  const blocks = all({ parentNode: "nodes" });

  return (
    <BuilderSidebar>
      <Palette enableDragging onSelect={(value) => add(value)} />
      <Overview
        blocks={blocks}
        active={active}
        onSelect={select}
        onDelete={remove}
        onMove={move}
      />
      <InspectorPanel />
      <CodeGenerator
        resolvers={[
          {
            name: "ast",
            label: "Ast",
            language: "js",
            resolver: astResolver,
          },
        ]}
      />
    </BuilderSidebar>
  );
}
