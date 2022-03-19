import { Task } from "task/Task";

export type UpgradeTaskTarget = StructureController

export class UpgradeTask extends Task {
    static Name = 'upgrade';
    target: UpgradeTaskTarget;
    constructor(target: UpgradeTaskTarget, protoTask: ProtoTask) {
        super(protoTask);
        this.target = target;
        this.setting.range = 3;
    }
    work(): number {
        return this.oveep.creep.upgradeController(this.target);
    }
    isTargetValid(): boolean {
        return true;
    }
    isTaskValid(): boolean {
        return this.oveep.creep.store.energy != 0;
    }

}
