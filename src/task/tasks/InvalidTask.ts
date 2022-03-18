import { Task } from "task/Task";

export class InvalidTask extends Task {
    work(): number {
        return 0;
    }
    isTargetValid(): boolean {
        return false;
    }
    isTaskValid(): boolean {
        return false;
    }

}
