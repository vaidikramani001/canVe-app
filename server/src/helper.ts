/**
 *
 * @param obj
 * @param keys
 * @returns
 */
export function omit<TKind>(obj: TKind, keys: (keyof TKind)[]) {
  return Object.entries(obj as ArrayLike<TKind>).reduce(
    (newObj, [key, value]) => {
      if (!keys.includes(key as keyof TKind)) {
        newObj[key] = value;
      }

      return newObj;
    },
    {} as Record<string, unknown>
  ) as TKind;
}

/**
 *
 * @param obj
 * @param keys
 * @returns
 */
export function select<TKind>(obj: TKind, keys: (keyof TKind)[]) {
  return Object.entries(obj as ArrayLike<TKind>).reduce(
    (newObj, [key, value]) => {
      if (keys.includes(key as keyof TKind)) {
        newObj[key] = value;
      }

      return newObj;
    },
    {} as Record<string, unknown>
  ) as TKind;
}


export const replace = (
  inputString: string,
  replacements: Record<string, string>
) => {
  let resultString = inputString;

  for (const [token, replacement] of Object.entries(replacements)) {
    const regex = new RegExp(token, "g");
    resultString = resultString.replace(regex, replacement);
  }

  return resultString;
};

