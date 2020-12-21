const spin = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Animation = {
  InfiniteSpin: (duration?: number) => `
    ${spin}
    animation: spin ${duration ?? 1}s infinite linear;
  `,
};
