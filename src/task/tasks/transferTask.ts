import { isStoreStructure } from "declartion/typeGuard";
import { Task } from "task/Task";

export type TransferTaskTarget = AnyCreep | Structure<StructureConstant>


export class TransferTask extends Task {
    static Name = 'transfer';
    target: TransferTaskTarget;
    data: {
        resourceType: ResourceConstant;
        amount: number;
    }

    constructor(target: TransferTaskTarget, protoTask: ProtoTask) {
        super(protoTask);
        this.data = {
            amount: protoTask.data.amount ? protoTask.data.amount : -1,
            resourceType: protoTask.data.resourceType? protoTask.data.resourceType : RESOURCE_ENERGY
        }
        this.target = target;
        this.setting.oneshot = true;
    }

    work(): number {
        if (this.data.amount == -1) return this.oveep.creep.transfer(this.target,this.data.resourceType);
        return this.oveep.creep.transfer(this.target,this.data.resourceType,this.data.amount);
    }
    isTargetValid(): boolean {
        if (isStoreStructure(this.target)) {
            if (this.target.store.getFreeCapacity(this.data.resourceType) == 0) return false;
            return this.target.store.getFreeCapacity(this.data.resourceType) > this.data.amount;
        }
        if (this.target instanceof Creep) {
            if (this.target.store.getFreeCapacity(this.data.resourceType) == 0) return false;
            return this.target.store.getFreeCapacity(this.data.resourceType) > this.data.amount;
        }
        return false;
    }
    isTaskValid(): boolean {
        let x = this.oveep.creep.store.getUsedCapacity(this.data.resourceType);
        return x != 0 && x > this.data.amount;
    }

}
