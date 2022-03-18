import { Queue } from "datastructure/Queue"
import { OveepBodys } from "oveep/roles/bodys";
import { OvMind } from "ovmind/OvMind";

export class Queen {
    spawnQueue = new Queue<SpawnMessage>();
    Request(spawnMessage: SpawnMessage) {
        this.spawnQueue.enqueue(spawnMessage);
    }
    getNewName(role: string):string {
        let id = 0;
        while (Game.creeps[role+'_'+id]) id++;
        return role + '_' + id;
    }
    trySpawn(spawn: StructureSpawn, request: SpawnMessage):boolean {
        let body = OveepBodys.get(request.role);
        if (body) return spawn.spawnCreep( body, this.getNewName(request.role), {memory:{role: request.role, task: null},dryRun: true}) == OK;
        else return false;
    }
    spawn(spawn: StructureSpawn, request: SpawnMessage) {
        let body = OveepBodys.get(request.role);
        if (body) {
            let name = this.getNewName(request.role);
            spawn.spawnCreep( body, name , {memory:{role: request.role, task: null}});
            OvMind.getInstance().people.Add(name);
            this.spawnQueue.dequeue();
        }
    }
    init() {

    }
    run() {
        while (!this.spawnQueue.isEmpty()) {
            let f = true;
            _.forEach(Game.spawns,(spawn)=>{
                if (!spawn.spawning) {
                    let request = this.spawnQueue.queueHead();
                    if (request && this.trySpawn(spawn,request)) {
                        this.spawn(spawn,request);
                        f = false;
                    }
                }
            })
            if (f) return;
        }
    }
}
