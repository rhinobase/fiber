"use client";
import {
  formBlocks,
  formConfig,
  pageBlocks,
  pageConfig,
  workflowBlocks,
  workflowConfig,
} from "@fibr/blocks";
import {
  type BlockType,
  EditorEvent,
  Env,
  Workspace,
  useBuilder,
} from "@fibr/builder";
import { FormBuilder } from "@fibr/form";
import { PageBuilder } from "@fibr/page";
import { WorkflowBuilder } from "@fibr/workflow";
import {
  Button,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  eventHandler,
} from "@rafty/ui";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { VscDebugStart } from "react-icons/vsc";
import { Logo } from "../../components/Logo";
import { ThemeToggle } from "../../components/ThemeToggle";
import { Container, TemplateDialog } from "./templates";

type PanelProps = { template: BlockType[] };

const PANELS: Record<Container, (props: PanelProps) => ReactNode> = {
  [Container.FORM]: ({ template }) => (
    <FormBuilder
      initialSchema={template}
      blocks={formBlocks}
      config={formConfig}
    />
  ),
  [Container.WORKFLOW]: ({ template }) => (
    <WorkflowBuilder
      initialSchema={template}
      blocks={workflowBlocks}
      config={workflowConfig}
    />
  ),
  [Container.PAGE]: ({ template }) => (
    <PageBuilder
      initialSchema={template}
      blocks={pageBlocks}
      config={pageConfig}
    />
  ),
};

export default function Playground() {
  const [container, setContainer] = useState(Container.FORM);
  const [template, setTemplate] = useState<PanelProps["template"]>();

  const Component = PANELS[container];

  return (
    <>
      <Workspace
        initialEvents={{
          [EditorEvent.ALL]: [
            ({ event_type, ...props }) => console.log(event_type, props),
          ],
        }}
      >
        <Header />
        {template ? (
          <Component template={template} />
        ) : (
          <div className="flex-1" />
        )}
        <Footer />
      </Workspace>
      <TemplateDialog
        container={container}
        onContainerChange={setContainer}
        onSelect={(value) => setTemplate(value as PanelProps["template"])}
      />
    </>
  );
}

function Header() {
  const { isDevEnv, toggleEnv } = useBuilder(
    ({ env: { current, change } }) => ({
      isDevEnv: current === Env.DEVELOPMENT,
      toggleEnv: () =>
        change(current === Env.DEVELOPMENT ? Env.PRODUCTION : Env.DEVELOPMENT),
    }),
  );

  const handleEnvToggle = eventHandler(() => toggleEnv());

  const EnvIcon = isDevEnv ? VscDebugStart : HiOutlineCodeBracketSquare;

  return (
    <header className="border-secondary-200 dark:border-secondary-800 flex w-full items-center gap-3 border-b px-2 py-0.5">
      <a
        title="Fibr Logo"
        href="https://www.rhinobase.io/"
        className="flex select-none items-baseline gap-0.5"
      >
        <Logo className="h-4 w-auto" />
        <Text className="text-xl font-bold italic">Fibr</Text>
      </a>
      <div className="flex-1" />
      <ThemeToggle />
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<EnvIcon size={18} />}
            onClick={handleEnvToggle}
            onKeyDown={handleEnvToggle}
          >
            {isDevEnv ? "Preview" : "Sandbox"}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          isArrow={false}
          className="rounded px-1.5 py-1.5 text-[0.75rem] leading-none"
        >
          Toggle preview mode
        </TooltipContent>
      </Tooltip>
    </header>
  );
}

const SOCIALS = {
  twitter: {
    link: "https://twitter.com/rhinobaseio",
    icon: FaXTwitter,
  },
  github: {
    link: "https://github.com/rhinobase/fibr",
    icon: FaGithub,
  },
};

function Footer() {
  return (
    <footer className="border-secondary-200 dark:border-secondary-800 flex w-full select-none items-center border-t text-[0.75rem] leading-[1.25rem]">
      <Text isMuted>version {process.env.NEXT_PUBLIC_VERSION}</Text>
      <div className="flex-1" />
      <Text isMuted>
        © {new Date().getFullYear()} rhinobase, Inc. All rights reserved.
      </Text>
      <div className="flex-1" />
      <div className="flex items-center gap-2 px-2">
        {Object.entries(SOCIALS).map(([name, { link, icon: Icon }]) => (
          <Link
            key={name}
            href={link}
            title={name}
            className="text-secondary-500 dark:text-secondary-400 dark:hover:text-secondary-50 transition-all ease-in-out hover:text-black"
            target="_blank"
            rel="noopener"
          >
            <Icon size={15} />
          </Link>
        ))}
      </div>
    </footer>
  );
}
