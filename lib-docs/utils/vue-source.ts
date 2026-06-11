const getBlock = (source: string, tag: string) => {
  return (
    source
      .match(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, "i"))?.[0]
      .trim() ?? ""
  );
};

const getSourceBlocks = (source: string) => {
  return Array.from(
    source.matchAll(/<(template|script|style)\b[^>]*>[\s\S]*?<\/\1>/gi),
  )
    .filter((match) => match[1].toLowerCase() !== "style")
    .map((match) => {
      const tag = match[1].toLowerCase();

      return {
        lang: tag === "script" ? "javascript" : "html",
        source: match[0].trim(),
      };
    });
};

export const splitVueSource = (source: string) => ({
  templateData: getBlock(source, "template"),
  scriptData: getBlock(source, "script"),
  cssData: "",
  blocks: getSourceBlocks(source),
});
