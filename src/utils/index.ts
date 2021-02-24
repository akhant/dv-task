import { PlaceItem, InvItem } from './../interfaces/index';

// transoform data to tree
// input PlaceItem[]
export const normalizeData = (arr: any) => {
  let res: any = [];

  //recursive function
  const recFunc = (id: string, mainObj: any) => {
    const obj = arr.find((item: PlaceItem) => item.id === id);

    if (!obj?.parts) {
      //@ts-ignore
      obj.parentId = mainObj;
      return obj;
    }

    let childrens = [];

    for (let item of obj.parts) {
      const newObj = {
        ...arr.find((i: PlaceItem) => i.id === item),
        parentId: mainObj.id,
      };
      childrens.push(recFunc(item, newObj));
    }

    mainObj.childrens = childrens;
    return mainObj;
  };

  for (let building of arr) {
    if (building.id === 'main' || building.id === 'production') {
      res.push(recFunc(building.id, building));
    }
  }

  return res;
};

export const filterInventory = (
  placesArr: PlaceItem[],
  inv: InvItem[],
  placeId: string
) => {
  let res: any = [];
  const addInvToRes = (place: PlaceItem) => {
    res = [...res, ...inv.filter((item: InvItem) => item.placeId === place.id)];

    if (place.childrens) {
      for (let item of place.childrens) {
        addInvToRes(item);
      }
    }
  };
  const findNode = (placesArray: PlaceItem[]) => {
    for (let place of placesArray) {
      if (place.id === placeId) {
        addInvToRes(place);
        break;
      }
      if (place.childrens) {
        findNode(place.childrens);
      }
    }
  };

  findNode(placesArr);

  return res;
};

export const findMinLevelIds = (places: PlaceItem[]) => {
  const res: string[] = [];

  const recFindMin = (placesArr: typeof places) => {
    for (let place of placesArr) {
      if (place.childrens) {
        recFindMin(place.childrens);
      } else {
        res.push(place.id);
      }
    }
  };

  recFindMin(places);
  return res;
};
