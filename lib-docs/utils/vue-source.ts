const getBlock = (source: string, tag: string) => {
  return (
    source
      .match(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, "i"))?.[0]
      .trim() ?? ""
  );
};

const getBlocks = (
  source: string,
  tag: string,
  filterBlock: (block: string) => boolean = () => true,
) => {
  return Array.from(
    source.matchAll(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi")),
  )
    .map((match) => match[0].trim())
    .filter(filterBlock)
    .join("\n\n");
};

const hasCustomPropertyDeclaration = (source: string) =>
  /(?:^|[{\s;])--[A-Za-z0-9_-]+\s*:/m.test(source);

const getSourceBlocks = (source: string) => {
  return Array.from(
    source.matchAll(/<(template|script|style)\b[^>]*>[\s\S]*?<\/\1>/gi),
  )
    .filter((match) => {
      const tag = match[1].toLowerCase();
      return tag !== "style" || hasCustomPropertyDeclaration(match[0]);
    })
    .map((match) => {
      const tag = match[1].toLowerCase();

      return {
        lang: tag === "style" ? "css" : tag === "script" ? "javascript" : "html",
        source: match[0].trim(),
      };
    });
};

export const splitVueSource = (source: string) => ({
  templateData: getBlock(source, "template"),
  scriptData: getBlock(source, "script"),
  cssData: getBlocks(source, "style", hasCustomPropertyDeclaration),
  blocks: getSourceBlocks(source),
});
