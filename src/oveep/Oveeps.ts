import { InitOveep } from "./InitOveep";
import { Oveep } from "./Oveep";

export class Oveeps {
    oveeps: {[name: string]: Oveep} = {};

    init() {
        _.forEach(Game.creeps,(creep)=>{
            this.Add(creep.name);
        })
    }
    Add(name: string) {
        this.oveeps[name] = InitOveep(name);
    }
    get(name: string) {
        return this.oveeps[name];
    }
    run() {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                if (this.oveeps[name]) this.oveeps[name].dead();
                delete this.oveeps[name];
                delete Memory.creeps[name];
            }
        }
        _.forEach(this.oveeps,(oveep)=>{
            if (!oveep.creep.spawning) oveep.run();
        })
    }
}
