import { IItemsData } from "./IItemsData";

export interface IPathData {
    pathName: string;
    pathId: string;
    items: IItemsData[];
    pathImage?: string;
}