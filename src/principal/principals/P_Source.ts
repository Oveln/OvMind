import { Principal } from "principal/Principal";
import { HarvestTask } from "task/tasks/harvestTask";

export class P_Source extends Principal {
    _vacancy = -1;
    get target():Source {
        return this.object as Source;
    }
    vacancy() {
        if (this._vacancy >-1) return this._vacancy;
        let ret = 0;
        for (let i=-1;i<2;i++)
        for (let j=-1;j<2;j++) {
            if (i==0 && j==0) continue;
            let npos = this.target.room.getPositionAt(this.target.pos.x+i,this.target.pos.y+j);
            if (!npos) continue;
            let lookTarget = npos.look();
            let f = true;
            _.forEach(lookTarget,(target)=>{
                f = f && (target.terrain == 'wall' ||
                         (target.type == 'structure' && !(target.structure instanceof StructureContainer)))
            })
            if (!f) ret++;
        }
        this._vacancy = ret;
        return this._vacancy;
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
        let vac = this.vacancy();
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
