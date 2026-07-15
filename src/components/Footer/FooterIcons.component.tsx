interface IIconProps {
  className?: string;
}

const defaultProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
};

export const MapPinIcon = ({ className }: IIconProps) => (
  <svg {...defaultProps} className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

export const PhoneIcon = ({ className }: IIconProps) => (
  <svg {...defaultProps} className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a2.25 2.25 0 00-2.109.58l-.548.547a1.03 1.03 0 01-1.281.129 12.06 12.06 0 01-5.324-5.324 1.03 1.03 0 01.129-1.281l.547-.548a2.25 2.25 0 00.58-2.109L7.612 3.102a1.125 1.125 0 00-1.091-.852H5.25A2.25 2.25 0 003 4.5v1.5c0 .621 0 .75 0 .75z"
    />
  </svg>
);

export const MailIcon = ({ className }: IIconProps) => (
  <svg {...defaultProps} className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

export const ClockIcon = ({ className }: IIconProps) => (
  <svg {...defaultProps} className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const WhatsAppIcon = ({ className }: IIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.27-1.38a9.9 9.9 0 004.72 1.2h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2zm0 18.1h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 01-1.25-4.38c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4a8.15 8.15 0 012.4 5.8c0 4.52-3.68 8.24-8.17 8.24zm4.49-6.15c-.24-.12-1.45-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.24-.64.8-.78.96-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35 1 2.51c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
  </svg>
);

export const FacebookIcon = ({ className }: IIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.34c-.26-.04-1.16-.11-2.2-.11-2.18 0-3.67 1.33-3.67 3.77v2.5H8.2v3h2.43V21h2.87z" />
  </svg>
);

export const InstagramIcon = ({ className }: IIconProps) => (
  <svg {...defaultProps} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <path d="M16 11.37a4 4 0 11-7.914 1.173A4 4 0 0116 11.37z" />
    <path strokeLinecap="round" d="M17.5 6.5h.01" />
  </svg>
);

export const XIcon = ({ className }: IIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M18.24 3h3.06l-6.69 7.64L22.5 21h-6.16l-4.83-6.32L5.98 21H2.92l7.16-8.18L2.25 3h6.32l4.37 5.78L18.24 3zm-1.07 16.17h1.7L7.9 4.74H6.08l11.09 14.43z" />
  </svg>
);
