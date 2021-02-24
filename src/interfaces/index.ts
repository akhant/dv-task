export interface InvItem {
  id: string;
  placeId?: string | undefined;
  data: any;
}
export interface InvItemData {
  name?: string;
  count?: string | number;
}

export interface PlaceItem {
  id: string;
  data: PlaceItemData;
  parts?: string[];
  childrens?: any;
  parentId?: string;
}

export interface PlaceItemData {
  name: string;
  parts?: any;
}

export interface InventoryItemProps {
  item: InvItem;
}

export interface InventoryListProps {
  placeId?: string;
}
export interface PlaceCardElementProps {
  item: PlaceItem;
}
