export class QueryConverter {
  static toNumberIfExists(
    numberString: string | undefined,
  ): number | undefined {
    if (numberString === undefined) return undefined;

    return Number(numberString);
  }
}
