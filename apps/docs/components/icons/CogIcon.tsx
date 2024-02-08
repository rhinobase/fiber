import { IconType } from "./icon";

export function CogIcon(props: IconType) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        strokeWidth="0"
        fillRule="evenodd"
        d="M11.063 1.5H8.937l-.14 1.128c-.086.682-.61 1.22-1.246 1.484-.634.264-1.37.247-1.912-.175l-.898-.699-1.503 1.503.699.898c.422.543.44 1.278.175 1.912-.264.635-.802 1.16-1.484 1.245L1.5 8.938v2.124l1.128.142c.682.085 1.22.61 1.484 1.244.264.635.247 1.37-.175 1.913l-.699.898 1.503 1.503.898-.699c.543-.422 1.278-.44 1.912-.175.635.264 1.16.801 1.245 1.484l.142 1.128h2.124l.142-1.128c.085-.683.61-1.22 1.244-1.484.635-.264 1.37-.247 1.913.175l.898.699 1.503-1.503-.699-.898c-.422-.543-.44-1.278-.175-1.913.264-.634.801-1.16 1.484-1.245l1.128-.14V8.937l-1.128-.14c-.683-.086-1.22-.611-1.484-1.246-.264-.634-.247-1.37.175-1.912l.699-.898-1.503-1.503-.898.699c-.543.422-1.278.44-1.913.175-.634-.264-1.16-.802-1.244-1.484L11.062 1.5ZM10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        clipRule="evenodd"
      />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.938 1.5h2.124l.142 1.128c.085.682.61 1.22 1.244 1.484v0c.635.264 1.37.247 1.913-.175l.898-.699 1.503 1.503-.699.898c-.422.543-.44 1.278-.175 1.912v0c.264.635.801 1.16 1.484 1.245l1.128.142v2.124l-1.128.142c-.683.085-1.22.61-1.484 1.244v0c-.264.635-.247 1.37.175 1.913l.699.898-1.503 1.503-.898-.699c-.543-.422-1.278-.44-1.913-.175v0c-.634.264-1.16.801-1.245 1.484l-.14 1.128H8.937l-.14-1.128c-.086-.683-.611-1.22-1.246-1.484v0c-.634-.264-1.37-.247-1.912.175l-.898.699-1.503-1.503.699-.898c.422-.543.44-1.278.175-1.913v0c-.264-.634-.802-1.16-1.484-1.245l-1.128-.14V8.937l1.128-.14c.682-.086 1.22-.61 1.484-1.246v0c.264-.634.247-1.37-.175-1.912l-.699-.898 1.503-1.503.898.699c.543.422 1.278.44 1.912.175v0c.635-.264 1.16-.802 1.245-1.484L8.938 1.5Z"
      />
      <circle cx="10" cy="10" r="2.5" fill="none" />
    </svg>
  );
}
