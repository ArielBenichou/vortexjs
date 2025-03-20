export function assert(ok: boolean, ...messages: string[]): asserts ok is true {
  if (!ok) {
    throw new Error(messages.join(" "));
  }
}
