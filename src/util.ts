import { Structure } from "./types";

export function mapToArray(map: any): any {
  return Array.from(map, ([_key, value]) => {
    return value;
  });
}

export function makeStructure(
  pairName: string,
  dataArray: number[]
): Structure {
  return {
    name: pairName,
    last: dataArray[6],
    change: dataArray[4],
    changeRelative: dataArray[5],
    high: dataArray[8],
    low: dataArray[9],
  };
}
