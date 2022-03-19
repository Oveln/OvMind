import { Miner } from "oveep/roles/Miner";

export var OveepConfigs: {[role:string]: OveepConfig} = {}
export function OveepConfigsInit() {
    OveepConfigs[Miner.Name] = {
        body: [WORK,CARRY,MOVE],
        amount: 5
    };
}
