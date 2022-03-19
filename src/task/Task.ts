import { Oveep } from "oveep/Oveep";
import { OvMind } from "ovmind/OvMind";
import { InitTask } from "./InitTask";

export abstract class Task {
    id: string;
    name: string;
    oveepName: string;
    _target: {
        id: Id<any>;
        pos: ProtoPos;
    };
    _next: ProtoTask | null;
    // option: TaskOption;
    data: TaskData;
    outtime: number;
    setting: TaskSetting;

    constructor(proto: ProtoTask) {
        this.id = proto.id;
        this.name = proto.name;
        this.oveepName = proto.oveepName;
        this._target = proto._target;
        this._next = proto._next;
        this.data = proto.data;
        this.outtime = proto.outtime;
        this.setting = {
            range: 1,
            oneshot: false
        }
    }

    get oveep():Oveep {
        return OvMind.getInstance().getOveep(this.oveepName);
    }
    set oveep(oveep: Oveep) {
        if (oveep) this.oveepName = oveep.name;
        else this.oveepName = '';
    }

    get next(): Task | null {
        return InitTask(this._next);
    }

    get proto():ProtoTask {
        return {
            id: this.id,
            name: this.name,
            oveepName: this.oveepName,
            _target: this._target,
            _next: this._next,
            data: this.data,
            outtime: this.outtime
        }
    }


    abstract work(): number;
    abstract isTargetValid(): boolean;
    abstract isTaskValid(): boolean;

    isOuttime():boolean {
        return this.outtime < Game.time && this.outtime != -1;
    }
    isValid():boolean {
        return this.isTargetValid() && this.isTaskValid() && !this.isOuttime();
    }
    isInrange() {
        let pos = new RoomPosition(this._target.pos.x,this._target.pos.y,this._target.pos.roomName);
        return this.oveep.creep.pos.inRangeTo(pos,this.setting.range);
    }

    run() {
        if (!this.isValid()) {
            this.finish();
            return;
        }
        if (!this.isInrange()) {
            if (this.oveep.moveTo(this._target.pos) != OK) this.oveep.creep.say('我他妈找不到路了');
        } else if (this.work() == OK && this.setting.oneshot) {
            this.finish();
        }
    }

    finish() {
        this.oveep.creep.say('我滴任务完成啦');
        if (!this._next) OvMind.getInstance().union.DelTask(this.id);
        this.oveep.task = this.next;
    }
}
