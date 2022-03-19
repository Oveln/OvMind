import { InitOveep } from "oveep/InitOveep";
import { Oveep } from "oveep/Oveep";

export class Oveeps {
    role: string;
    oveeps: {[name: string]: Oveep} = {};
    size = 0;

    constructor(role: string) {
        this.role = role;
        if (!Memory.requested[this.role]) Memory.requested[this.role] = 0;
    }
    get requested():number {
        return Memory.requested[this.role];
    }
    set requested(x: number) {
        Memory.requested[this.role] = x;
    }
    init() {
        _.forEach(Game.creeps,(creep)=>{
            this.Add(creep.name);
        })
    }
    Add(name: string) {
        this.size++;
        this.oveeps[name] = InitOveep(name);
    }
    get(name: string) {
        return this.oveeps[name];
    }
    run() {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                if (this.oveeps[name]) this.oveeps[name].dead();
                this.size--;
                delete this.oveeps[name];
                delete Memory.creeps[name];
            }
        }
        _.forEach(this.oveeps,(oveep)=>{
            if (!oveep.creep.spawning) oveep.run();
        })
    }
}
