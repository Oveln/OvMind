import { OvMind } from "ovmind/OvMind";

export abstract class Principal {
    objectid: Id<any>;
    constructor(id: Id<any>) {
        this.objectid = id;
        // this.tasked = [];
        Memory.tasked[this.objectid] = [];
    }
    get tasked():string[] {
        return Memory.tasked[this.objectid];
    }
    get object():RoomObject {
        return Game.getObjectById(this.objectid);
    }
    abstract get target():RoomObject;
    NewId():string {
        let id = 0;
        while (!OvMind.getInstance().union.queryTask(id+'_'+this.objectid)) id++;
        return id+'_'+this.objectid;
    }
    AddTask(protoTask: ProtoTask) {
        this.tasked.push(protoTask.id);
        OvMind.getInstance().union.AddTask(protoTask);
    }
    checkTask() {
        for (let i = 0;i<this.tasked.length;i++) {
            if (OvMind.getInstance().union.queryTask(this.tasked[i])) {
                this.tasked.splice(i,1);
                i--;
            }
        }
    }
    abstract publishTask(): void;
    run() {
        this.checkTask();
        this.publishTask();
    }
}
