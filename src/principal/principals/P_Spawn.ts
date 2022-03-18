import { Principal } from "principal/Principal";
import { TransferTask } from "task/tasks/transferTask";

export class P_Spawn extends Principal {
    get target(): StructureSpawn {
        return this.object as StructureSpawn
    }
    vacancy() {
        let ret = 0;
        for (let i=-1;i<2;i++)
        for (let j=-1;j<2;j++) {
            if (i==0 && j==0) continue;
            let npos = this.target.room.getPositionAt(this.target.pos.x+i,this.target.pos.y+j);
            if (!npos) continue;
            let lookTarget = npos.look();
            let f = true;
            _.forEach(lookTarget,(target)=>{
                f = f && (target.type == 'creep' ||
                         target.terrain == 'wall' ||
                         (target.type == 'structure' && !(target.structure instanceof StructureContainer)))
            })
            if (!f) ret++;
        }
        return ret;
    }
    publishTask(): void {
        let vac = this.vacancy();
        if (this.target.store.energy < 300 && this.tasked.length < vac)
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
