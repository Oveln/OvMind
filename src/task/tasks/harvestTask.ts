import { Task } from "task/Task";

export type HarvestTaskTarget = Source | Mineral

export class HarvestTask extends Task {
    static Name = 'harvest';
    target: HarvestTaskTarget;

    constructor(target: HarvestTaskTarget, protoTask: ProtoTask) {
        super(protoTask);
        this.target = target;
    }

    work(): number {
        return this.oveep.creep.harvest(this.target);
    }
    isTargetValid(): boolean {
        if (this.target instanceof Source && this.target.energy == 0) return false;
        if (this.target instanceof Mineral && this.target.mineralAmount == 0) return false;
        return true;
    }
    isTaskValid(): boolean {
        if (this.oveep.creep.store.getFreeCapacity() == 0) return false;
        return true;
    }

}
