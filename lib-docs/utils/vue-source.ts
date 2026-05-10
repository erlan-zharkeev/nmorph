const getBlock = (source: string, tag: string) => {
  return (
    source
      .match(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, "i"))?.[0]
      .trim() ?? ""
  );
};

const getBlocks = (source: string, tag: string) => {
  return Array.from(
    source.matchAll(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi")),
  )
    .map((match) => match[0].trim())
    .join("\n\n");
};

const getSourceBlocks = (source: string) => {
  return Array.from(
    source.matchAll(/<(template|script|style)\b[^>]*>[\s\S]*?<\/\1>/gi),
  ).map((match) => {
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
  cssData: getBlocks(source, "style"),
  blocks: getSourceBlocks(source),
});
