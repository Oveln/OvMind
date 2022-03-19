import { HarvestTask } from "task/tasks/harvestTask";
import { Principal } from "union/Principal";

export class P_Source extends Principal {
    get target():Source {
        return this.object as Source;
    }
    checkFlag():boolean {
        let ret = false;
        let flags = this.target.pos.lookFor(LOOK_FLAGS);
        _.forEach(flags,(flag)=>{
            if (flag.color == COLOR_YELLOW) {
                ret = true;
            }
        })
        return ret;
    }
    publishTask() {
        if (!this.checkFlag()) return;
        let vac = this.vacancy(1);
        while (vac > this.tasked.length) {
            this.AddTask({
                id: this.NewId(),
                name: HarvestTask.Name,
                oveepName: '',
                _target: {
                    id: this.target.id,
                    pos: {
                        x: this.target.pos.x,
                        y: this.target.pos.y,
                        roomName: this.target.pos.roomName
                    }
                },
                outtime: Game.time + this.target.ticksToRegeneration,
                _next: null,
                data: {}
            })
        }
    }
}
