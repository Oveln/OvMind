import { Queue } from "datastructure/Queue"
import { Oveep } from "oveep/Oveep";
import { OveepConfigs } from "oveep_config";
import { Oveeps } from "./Oveeps";

export class Queen {
    spawnQueue = new Queue<SpawnMessage>();
    people: {[role: string]: Oveeps} = {};

    getOveep(name: string):Oveep {
        return this.people[name.split('_',1)[0]].get(name);
    }
    Request(spawnMessage: SpawnMessage) {
        this.spawnQueue.enqueue(spawnMessage);
    }
    getNewName(role: string):string {
        let id = 0;
        while (Game.creeps[role+'_'+id]) id++;
        return role + '_' + id;
    }
    trySpawn(spawn: StructureSpawn, request: SpawnMessage):boolean {
        let body = OveepConfigs[request.role]?.body;
        if (body) return spawn.spawnCreep( body, this.getNewName(request.role), {memory:{role: request.role, task: null},dryRun: true}) == OK;
        else return false;
    }
    spawn(spawn: StructureSpawn, request: SpawnMessage) {
        let body = OveepConfigs[request.role]?.body;
        if (body) {
            let name = this.getNewName(request.role);
            spawn.spawnCreep( body, name , {memory:{role: request.role, task: null}});
            this.people[request.role].Add(name);
            this.people[request.role].requested--;
            this.spawnQueue.dequeue();
        }
    }
    init() {
        for (let role in OveepConfigs) this.people[role] = new Oveeps(role);
        _.forEach(this.people,(roles)=>{
            roles.init();
        })
        console.log('Queen Init Success');
    }
    run() {
        _.forEach(this.people,(roles)=>{roles.run()});
        for (let role in OveepConfigs){
            let config = OveepConfigs[role];
            if (!config) return;
            if (this.people[role].size + this.people[role].requested < config.amount) {
                this.people[role].requested++;
                this.Request({role: role});
            }
        }
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
