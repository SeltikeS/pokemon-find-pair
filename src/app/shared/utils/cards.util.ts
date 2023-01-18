export class CardsUtil {
  public static shuffle<TArray>(array: TArray[]): TArray[] {
    for (let i = array.length - 1; i >= 0; --i) {
      const randomIndex = Math.floor(Math.random() * i);
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
  }
}
