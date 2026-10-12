// gray-matter 2.x has no bundled declarations. Keep the declaration limited
// to the string parsing API used by this journal; metadata is checked at runtime.
declare module "gray-matter" {
  function matter<T extends Record<string, unknown> = Record<string, unknown>>(
    input: string,
  ): { data: T; content: string };
  export = matter;
}
