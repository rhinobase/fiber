import { SidebarItem } from "@fibr/builder";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { SearchField } from "@rafty/ui";
import Fuse, { type RangeTuple } from "fuse.js";
import { useMemo, useState } from "react";
import { useBlocks } from "../../providers";
import { Block } from "../../types";
import { Empty } from "../utils";
import { PaletteCard } from "./PaletteCard";
import { PaletteCardOverlay } from "./PaletteCardOverlay";

export type Palette = {
  isDisabled?: boolean;
  enableDragging?: boolean;
  onBlockSelect: PaletteCard["onSelect"];
};

export function Palette({
  isDisabled = false,
  enableDragging = false,
  onBlockSelect,
}: Palette) {
  const blocks = useBlocks((state) => state.blocks);
  const [search, setSearch] = useState<string>();

  const fuse = useMemo(() => {
    const data = Object.entries(blocks).flatMap(([category, blocks]) =>
      blocks.map((block) => ({ category, ...block })),
    );

    return new Fuse(data, {
      keys: ["type", "label"],
      includeMatches: true,
    });
  }, [blocks]);

  let blockResults = blocks;
  let isEmpty = false;

  if (search) {
    const init = Object.keys(blocks).reduce<Record<string, Block[]>>(
      (prev, cur) => {
        prev[cur] = [];
        return prev;
      },
      {},
    );

    const results = fuse.search(search);

    if (results.length === 0) isEmpty = true;

    blockResults = results.reduce<
      Record<string, (Block & { matches?: RangeTuple[] })[]>
    >((prev, cur) => {
      const { item, matches } = cur;

      prev[item.category].push({
        icon: item.icon,
        label: item.label,
        type: item.type,
        private: item.private,
        presets: item.presets,
        matches: matches
          ?.filter((match) => match.key === "label")
          .flatMap((match) => match.indices),
      });
      return prev;
    }, init);
  }

  return (
    <SidebarItem
      name="palette"
      label="Palette"
      icon={<Squares2X2Icon className="h-5 w-5 stroke-2" />}
    >
      {isDisabled ? (
        <div className="flex flex-1 flex-col justify-center">
          <Empty
            title="No canvas exists"
            description="Please add a canvas in order to add fields in it"
          />
        </div>
      ) : (
        <>
          <div className="sticky top-0 z-10 bg-white">
            <SearchField
              search={search}
              onSearch={setSearch}
              size="sm"
              autoComplete="off"
            />
          </div>
          {isEmpty ? (
            <div className="flex flex-1 flex-col justify-center">
              <Empty
                title="Component Not Found"
                description="Please check your spelling and try again, or explore our other available components."
              />
            </div>
          ) : (
            Object.entries(blockResults).map(
              ([category, components]) =>
                components.length > 0 && (
                  <div key={category} className="space-y-2.5 pb-3">
                    <h3 className="text-sm font-semibold">{category}</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {components.map((block, index) => (
                        <PaletteCard
                          key={`${index}-${block.type}`}
                          {...block}
                          enableDragging={enableDragging}
                          onSelect={onBlockSelect}
                        />
                      ))}
                    </div>
                  </div>
                ),
            )
          )}
        </>
      )}
      {enableDragging && <PaletteCardOverlay />}
    </SidebarItem>
  );
}
