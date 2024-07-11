export interface IRemoveDuplicates {
  (array: string[]): string[];
}

const removeDuplicates: IRemoveDuplicates = (array: string[]): string[] => {
  return Array.from(new Set(array));
};

export default removeDuplicates;