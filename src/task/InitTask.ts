import { Task } from "./Task";
import { HarvestTask, HarvestTaskTarget } from "./tasks/harvestTask";
import { InvalidTask } from "./tasks/InvalidTask";
import { TransferTask, TransferTaskTarget } from "./tasks/transferTask";

export function InitTask(protoTask: ProtoTask | null):Task | null {
    if (!protoTask) return null;
    let name = protoTask.name;
    let target = Game.getObjectById(protoTask._target.id)
    let task: Task;
    switch (name) {
        case HarvestTask.Name: {
            task = new HarvestTask(target as HarvestTaskTarget,protoTask);
            break;
        }
        case TransferTask.Name: {
            task = new TransferTask(target as TransferTaskTarget, protoTask);
            break;
        }
        default: {
            task = new InvalidTask(protoTask);
        }
    }
    return task;
}
