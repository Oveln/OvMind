export interface StoreStructure extends Structure {
	store: StoreDefinition;
}
export function isStoreStructure(obj: RoomObject): obj is StoreStructure {
	return (<StoreStructure>obj).store != undefined;
}
