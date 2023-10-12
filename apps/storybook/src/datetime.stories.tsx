import f from "@fiber/core";
import { FiberForm, Fields } from "@fiber/react";
import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { DevTool } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Resolver } from "react-hook-form";

const meta: Meta = {
  title: "Fiber / Datetime",
};

export default meta;

type Story = StoryObj;

const defaultSchema = z.object({
  name: z.string(),
  start_time: z.string(),
  end_time: z.string(),
});

export const Default: Story = {
  render: () => (
    <FiberForm
      onSubmit={console.log}
      blueprint={f.form<z.infer<typeof defaultSchema>, Resolver<FieldValues>>({
        validation: zodResolver(defaultSchema),
        fields: {
          name: f.datetime({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          }),
          start_time: f.datetime({
            label: "Changed",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            readOnly: true,
          }),
          end_time: f.datetime({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            hidden: true,
          }),
        },
      })}
    >
      <Fields />
      <DevTool />
    </FiberForm>
  ),
};
