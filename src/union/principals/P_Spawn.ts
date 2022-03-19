import { TransferTask } from "task/tasks/transferTask";
import { Principal } from "union/Principal";

export class P_Spawn extends Principal {
    get target(): StructureSpawn {
        return this.object as StructureSpawn
    }
    publishTask(): void {
        let vac = this.vacancy(1);
        if (this.target.store.energy < 300 && this.tasked.length < 3)
            this.AddTask({
                id: this.NewId(),
                name: TransferTask.Name,
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
                data: {
                    amount: -1,
                    resourceType: RESOURCE_ENERGY
                }
            })
    }

}
