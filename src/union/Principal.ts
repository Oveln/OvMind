import { OvMind } from "ovmind/OvMind";

export abstract class Principal {
    _vacancy: {[range: number]:number} = {};
    objectid: Id<any>;
    _object: RoomObject; //缓存
    _cacheTime: number = -1; // 缓存时间
    constructor(id: Id<any>) {
        this.objectid = id;
        this._object = Game.getObjectById(this.objectid);
        // this.tasked = [];
        if (!Memory.tasked[this.objectid]) Memory.tasked[this.objectid] = [];
    }
    get tasked():string[] {
        return Memory.tasked[this.objectid];
    }
    get object():RoomObject {
        if (this._cacheTime == Game.time) return this._object;
        return  this._object = Game.getObjectById(this.objectid);
    }
    abstract get target():RoomObject;
    NewId():string {
        let id = 0;
        while (!OvMind.getInstance().union.queryTask(this.objectid+'_'+id)) id++;
        return this.objectid+'_'+id;
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
    vacancy(range: number):number {
        if (this._vacancy[range]) return this._vacancy[range];
        let ret = 0;
        let room = this.object.room
        if (!room) return 0;
        for (let i=-range;i<=range;i++)
        for (let j=-range;j<=range;j++) {
            if (i==0 && j==0) continue;
            let npos = room.getPositionAt(this.target.pos.x+i,this.target.pos.y+j);
            if (!npos) continue;
            let lookTarget = npos.look();
            let f = true;
            _.forEach(lookTarget,(target)=>{
                f = f && (target.terrain == 'wall' ||
                         (target.type == 'structure' && !(target.structure instanceof StructureContainer)))
            })
            if (!f) ret++;
        }
        this._vacancy[range] = ret;
        return this._vacancy[range];
    }
    abstract publishTask(): void;
    run() {
        this.checkTask();
        this.publishTask();
    }
}
