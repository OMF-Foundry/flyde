import { sep } from "path";
import callsite from "callsite";

export const getCallPath = (fnName: string) => {
  // Very hacky.. might need a refactor
  const stack = callsite();
  const idx = stack.findIndex((s) => {
    const folders: string[] = (s.getFileName() || "not available").split(sep); // for windows support
    const functionName = s.getFunctionName() || "n/a";
    return folders.includes("runtime") && functionName === fnName;
  });

  if (idx === -1) {
    throw new Error("Could not find runtime in stack");
  }

  const requester = stack[idx + 1].getFileName();

  return requester;

  // const path = join(requester, '..', flowPath);

  // const possiblePaths = [
  //   path,
  //   path.replace('/dist/', '/src/')
  // ];

  // while (possiblePaths.length) {
  //   const path = possiblePaths.shift();
  //   if (existsSync(path)) {
  //     return path;
  //   }
  // }
  // throw new Error(`Could not find flow file at ${possiblePaths.join(',')}`);
};
