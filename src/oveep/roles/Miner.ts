import { Oveep } from "oveep/Oveep";
import { OvMind } from "ovmind/OvMind";
import { HarvestTask } from "task/tasks/harvestTask";
import { TransferTask } from "task/tasks/transferTask";
import { UpgradeTask } from "task/tasks/upgradeTask";

const MinerTaskPriority = [HarvestTask.Name, TransferTask.Name, UpgradeTask.Name];
const MinerBody = [WORK,CARRY,MOVE];
export class Miner extends Oveep {
    static Name = 'miner';
    getTask(): void {
        for (let kind of MinerTaskPriority){
            let task = OvMind.getInstance().union.getTask(kind)
            if (task && this.tryTask(task)) {
                OvMind.getInstance().union.RegisterTask(this,kind);
                return;
            }
        }
    }
}
