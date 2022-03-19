import { UpgradeTask } from "task/tasks/upgradeTask";
import { Principal } from "union/Principal";

export class P_Controller extends Principal {
    get target(): StructureController {
        return this.object as StructureController;
    }
    publishTask(): void {
        while (this.vacancy(1) > this.tasked.length && 5 > this.tasked.length) {
            this.AddTask({
                id: this.NewId(),
                name: UpgradeTask.Name,
                oveepName: '',
                _target: {
                    id: this.target.id,
                    pos: {
                        x: this.target.pos.x,
                        y: this.target.pos.y,
                        roomName: this.target.pos.roomName
                    }
                },
                _next: null,
                outtime: -1,
                data: {}
            })
        }
    }

}
