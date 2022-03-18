import { Oveep } from "./Oveep";
import { Fucker } from "./roles/fucker";
import { Miner } from "./roles/Miner";

export function InitOveep(name: string):Oveep {
    let oveep: Oveep;
    let role = Game.creeps[name].memory.role;
    switch (role) {
        case Miner.Name: {
            oveep = new Miner(name);
            break;
        }
        default:{
            oveep = new Fucker(name);
            break;
        }
    }
    return oveep;
}
