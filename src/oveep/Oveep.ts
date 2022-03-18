import { OvMind } from "ovmind/OvMind";
import { InitTask } from "task/InitTask";
import { Task } from "task/Task";

export abstract class Oveep {
    name: string;
    _task: Task | null;

    constructor(name: string) {
        this.name = name;
        this._task = null;
    }

    get task():Task | null {
        if (this._task) return this._task;
        else if (this.creep.memory.task) return this._task = InitTask(this.creep.memory.task);
        return null;
    }
    set task(task: Task | null) {
        this.creep.memory.task = task?task.proto:null;
        this._task = task;
    }
    get creep() {
        return Game.creeps[this.name];
    }

    //尝试某个任务是否可做
    tryTask(task: Task):boolean {
        task.oveep = this;
        if (task.isValid()) {
            return true;
        } else {
            return false;
        }
    }

    dead() {
        if (this._task) OvMind.getInstance().union.DelTask(this._task.id);
    }
    moveTo(protopos: ProtoPos):number {
        let pos = new RoomPosition(protopos.x,protopos.y,protopos.roomName);
        return this.creep.moveTo(pos);
    }
    abstract getTask(): void;
    run() {
        if (this.task) this.task.run();
        else {
            this.getTask();
        }
    }
}
